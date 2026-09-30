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

    This class does NOT perform retrieval.

    It receives retrieved evidence and asks Gemini
    to synthesize an answer using that evidence only.
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

        if not query or not query.strip():
            return {
                "answer": "Please enter a valid question.",
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Enter a question about enterprise knowledge."
                ),
            }

        if not documents:
            return {
                "answer": (
                    "I couldn't find this information "
                    "in the indexed documents."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Try a more specific question or "
                    "contact the knowledge owner."
                ),
            }

        context = CitationContextBuilder.build_context_block(
            documents
        )

        prompt = f"""
You are an Enterprise AI Knowledge Assistant.

Your job is to answer the employee's question using
ONLY the verified enterprise document context below.

STRICT RULES:

1. Use only the supplied context.
2. Do not use outside knowledge.
3. Do not guess.
4. Do not invent policies, dates, numbers,
   names, procedures or permissions.
5. If the context does not contain enough evidence,
   clearly say that the information was not found.
6. Every factual answer should be supported by
   the supplied sources.
7. Keep the answer concise and professional.
8. Provide citations corresponding to the sources.
9. Confidence must reflect the strength of the
   available evidence.
10. Recommended action should be useful but must
    not introduce unsupported policy claims.

VERIFIED ENTERPRISE CONTEXT:

{context}

EMPLOYEE QUESTION:

{query}
"""

        try:
            response = self.llm.invoke(prompt)

            if hasattr(response, "model_dump"):
                return response.model_dump()

            if isinstance(response, dict):
                return response

            return {
                "answer": str(response),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": "",
            }

        except Exception as exc:
            return {
                "answer": (
                    "Unable to generate a response "
                    "from the knowledge base."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Please try again later."
                ),
                "error": str(exc),
            }