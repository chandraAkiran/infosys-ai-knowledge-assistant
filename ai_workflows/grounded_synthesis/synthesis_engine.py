import os
from typing import Any, Dict, List, Optional

from langchain_google_genai import (
    ChatGoogleGenerativeAI,
)

from ai_workflows.citation_builder.citation_formatter import (
    GroundedResponseSchema,
    CitationContextBuilder,
)


class GroundedSynthesisEngine:
    """
    Converts retrieved enterprise evidence into a
    grounded structured answer.

    Evidence may come from:
    - RAG / vector database
    - MCP enterprise connectors

    This class does NOT perform retrieval.
    """

    def __init__(
        self,
        google_api_key: Optional[str] = None,
        model_name: Optional[str] = None,
    ):
        api_key = (
            google_api_key
            or os.getenv("GEMINI_API_KEY")
            or os.getenv("GOOGLE_API_KEY")
        )

        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY or GOOGLE_API_KEY "
                "is not configured."
            )

        model_name = model_name or os.getenv(
            "LLM_MODEL",
            "gemini-3.8-flash",
        )

        self.llm = (
            ChatGoogleGenerativeAI(
                model=model_name,
                temperature=0.0,
                google_api_key=api_key,
            )
            .with_structured_output(
                GroundedResponseSchema
            )
        )

    def generate(
        self,
        query: str,
        documents: List[Any],
    ) -> Dict[str, Any]:

        # -------------------------------------------------
        # Input validation
        # -------------------------------------------------

        if not query or not query.strip():
            return {
                "answer": "Please enter a valid question.",
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Enter a question about enterprise knowledge."
                ),
            }

        # -------------------------------------------------
        # No evidence
        # -------------------------------------------------

        if not documents:
            return {
                "answer": (
                    "I couldn't find this information "
                    "in the available enterprise sources."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Try a more specific question or "
                    "contact the knowledge owner."
                ),
            }

        # -------------------------------------------------
        # Build evidence context
        # -------------------------------------------------

        context = CitationContextBuilder.build_context_block(
            documents
        )

        # Detect whether evidence came from MCP.
        has_mcp_evidence = any(
            document.metadata.get("source") == "MCP connector"
            for document in documents
            if hasattr(document, "metadata")
        )

        if has_mcp_evidence:
            source_instruction = """
Some or all of the supplied evidence comes from an
enterprise MCP connector.

Treat MCP connector output as verified enterprise
evidence for this request.

For MCP evidence:
- cite the MCP source using its document_name
- preserve the incident information exactly
- do not add information that is not present
"""
        else:
            source_instruction = """
The supplied evidence comes from the enterprise
knowledge base.

Cite the source documents supporting the answer.
"""

        # -------------------------------------------------
        # Grounded synthesis prompt
        # -------------------------------------------------

        prompt = f"""
You are an Enterprise AI Knowledge Assistant.

Your job is to answer the employee's question using
ONLY the verified enterprise evidence supplied below.

STRICT RULES:

1. Use only the supplied evidence.
2. Do not use outside knowledge.
3. Do not guess.
4. Do not invent policies, dates, numbers,
   names, procedures, statuses or permissions.
5. If the evidence does not contain enough information,
   clearly say that the information was not found.
6. Every factual statement must be supported by
   supplied evidence.
7. Keep the answer concise and professional.
8. Provide at least one citation when evidence supports
   the answer.
9. Citation document_name must exactly match a source
   document_name from the supplied evidence.
10. matched_passage must contain the relevant evidence
    supporting the answer.
11. confidence_score must be between 0 and 1.
12. Recommended action must not introduce unsupported
    policy claims.

{source_instruction}

VERIFIED ENTERPRISE EVIDENCE:

{context}

EMPLOYEE QUESTION:

{query}
"""

        try:
            response = self.llm.invoke(prompt)

            if hasattr(response, "model_dump"):
                result = response.model_dump()

            elif isinstance(response, dict):
                result = response

            else:
                result = {
                    "answer": str(response),
                    "confidence_score": 0.0,
                    "citations": [],
                    "recommended_action": "",
                }

            # -------------------------------------------------
            # Normalize confidence
            # -------------------------------------------------

            confidence = result.get(
                "confidence_score",
                0.0,
            )

            try:
                confidence = float(confidence)
            except (TypeError, ValueError):
                confidence = 0.0

            confidence = max(
                0.0,
                min(1.0, confidence),
            )

            result["confidence_score"] = confidence

            # -------------------------------------------------
            # Ensure citations exist when evidence exists
            # -------------------------------------------------

            citations = result.get(
                "citations",
                [],
            )

            if not citations:
                first_document = documents[0]

                metadata = getattr(
                    first_document,
                    "metadata",
                    {},
                )

                result["citations"] = [
                    {
                        "document_name": metadata.get(
                            "document_name",
                            "Enterprise source",
                        ),
                        "page_number": metadata.get(
                            "page_number"
                        ),
                        "department": metadata.get(
                            "department",
                            "Unknown",
                        ),
                        "matched_passage": (
                            first_document.page_content[:500]
                        ),
                    }
                ]

            return result

        except Exception as exc:

            # -------------------------------------------------
            # Safe fallback
            #
            # The evidence is still available, so return a
            # grounded response rather than pretending that
            # no enterprise evidence exists.
            # -------------------------------------------------

            first_document = documents[0]

            metadata = getattr(
                first_document,
                "metadata",
                {},
            )

            fallback_answer = (
                first_document.page_content.strip()
            )

            return {
                "answer": fallback_answer,
                "confidence_score": 0.5,
                "citations": [
                    {
                        "document_name": metadata.get(
                            "document_name",
                            "Enterprise source",
                        ),
                        "page_number": metadata.get(
                            "page_number"
                        ),
                        "department": metadata.get(
                            "department",
                            "Unknown",
                        ),
                        "matched_passage": fallback_answer[:500],
                    }
                ],
                "recommended_action": (
                    "Review the cited enterprise source "
                    "for the latest information."
                ),
                "synthesis_error": str(exc),
            }