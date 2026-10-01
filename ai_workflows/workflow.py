from types import SimpleNamespace
from typing import Any, Dict, Optional

from ai_workflows.query_classification.query_classifier import (
    QueryClassifier,
)
from ai_workflows.query_classification.rbac_classifier import (
    QueryRBACClassifier,
)
from ai_workflows.tool_selection.tool_selector import (
    ToolSelector,
)
from ai_workflows.rag_retrieval.retriever import (
    EnterpriseRetriever,
)
from ai_workflows.grounded_synthesis.synthesis_engine import (
    GroundedSynthesisEngine,
)
from ai_workflows.answer_validation.answer_validator import (
    AnswerValidator,
)
from connectors.mcp_client import mcp_client


class EnterpriseAIWorkflow:
    """
    Main orchestration layer for the AI Knowledge Assistant.

    Flow:

        Query
          ↓
        Classification
          ↓
        RBAC
          ↓
        Tool Selection
          ↓
        ┌───────────────┐
        │               │
       RAG             MCP
        │               │
     Vector DB       Connector
        │               │
        └───────┬───────┘
                ↓
             Evidence
                ↓
        Grounded Synthesis
                ↓
            Validation
                ↓
          Final Response
    """

    def __init__(
        self,
        vector_db_path: Optional[str] = None,
        google_api_key: Optional[str] = None,
    ):
        self.retriever = EnterpriseRetriever(
            vector_db_path=vector_db_path,
            google_api_key=google_api_key,
        )

        self.synthesis_engine = GroundedSynthesisEngine(
            google_api_key=google_api_key,
        )

    @staticmethod
    def _build_mcp_document(
        tool_name: str,
        result: Dict[str, Any],
    ):
        """
        Convert MCP tool output into readable evidence
        so the grounded synthesis layer can produce a
        natural-language answer.
        """

        content = (
            f"Incident ID: {result.get('incident_id', 'Unknown')}\n"
            f"Status: {result.get('status', 'Unknown')}\n"
            f"Severity: {result.get('severity', 'Unknown')}\n"
            f"Service: {result.get('service', 'Unknown')}\n"
            f"Owner: {result.get('owner', 'Unknown')}\n"
            f"Last updated: {result.get('last_updated', 'Unknown')}"
        )

        return SimpleNamespace(
            page_content=content,
            metadata={
                "document_name": f"MCP:{tool_name}",
                "department": "Delivery Operations",
                "source": "MCP connector",
                "tool": tool_name,
                "page_number": None,
            },
        )

    @staticmethod
    def _workflow_metadata(
        classification: Dict[str, str],
        allowed_departments: list[str],
        tool_selection: Dict[str, str],
        document_count: int,
    ) -> Dict[str, Any]:

        return {
            "classification": classification,
            "allowed_departments": allowed_departments,
            "tool_selection": tool_selection,
            "retrieved_document_count": document_count,
        }

    def run(
        self,
        query: str,
        designation: str,
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
                "validation": {
                    "is_valid": False,
                    "issues": ["Empty query."],
                    "insufficient_context": False,
                },
                "workflow": {},
            }

        # -------------------------------------------------
        # RBAC
        # -------------------------------------------------

        if not QueryRBACClassifier.is_role_allowed(
            designation
        ):
            return {
                "answer": (
                    "Your employee role is not configured "
                    "for this assistant."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Contact the administrator to configure "
                    "your role."
                ),
                "validation": {
                    "is_valid": False,
                    "issues": ["Role is not configured."],
                    "insufficient_context": False,
                },
                "workflow": {},
            }

        # -------------------------------------------------
        # Query classification
        # -------------------------------------------------

        classification = QueryClassifier.classify(
            query
        )

        allowed_departments = (
            QueryRBACClassifier
            .get_allowed_departments(designation)
        )

        # -------------------------------------------------
        # Tool selection
        # -------------------------------------------------

        tool_selection = ToolSelector.select(
            classification
        )

        selected_tool = tool_selection["tool"]

        workflow_info = self._workflow_metadata(
            classification=classification,
            allowed_departments=allowed_departments,
            tool_selection=tool_selection,
            document_count=0,
        )

        documents = []

        # -------------------------------------------------
        # RAG path
        # -------------------------------------------------

        if selected_tool == "rag":

            retrieved_results = self.retriever.search(
                query=query,
                top_k=5,
                allowed_departments=allowed_departments,
            )

            documents = [
                document
                for document, score in retrieved_results
                if document is not None
            ]

            # -------------------------------------------------
            # No sufficiently relevant evidence
            # -------------------------------------------------

            if not documents:

                workflow_info[
                    "retrieved_document_count"
                ] = 0

                return {
                    "answer": (
                        "I don't have enough approved evidence "
                        "to answer this question reliably."
                    ),
                    "confidence_score": 0.0,
                    "citations": [],
                    "recommended_action": (
                        "Try a question covered by the indexed "
                        "enterprise knowledge sources, or contact "
                        "the knowledge owner to add the relevant "
                        "document."
                    ),
                    "validation": {
                        "is_valid": True,
                        "issues": [
                            "No sufficiently relevant evidence "
                            "was retrieved."
                        ],
                        "insufficient_context": True,
                    },
                    "workflow": workflow_info,
                }

        # -------------------------------------------------
        # MCP incident-status path
        # -------------------------------------------------

        elif selected_tool == "incident_status":

            workflow_info["tool_selection"] = tool_selection

            if not mcp_client.has_tool(
                "incident_status"
            ):
                return {
                    "answer": (
                        "The incident-status connector "
                        "is currently unavailable."
                    ),
                    "confidence_score": 0.0,
                    "citations": [],
                    "recommended_action": (
                        "Try again later or contact "
                        "the administrator."
                    ),
                    "validation": {
                        "is_valid": False,
                        "issues": [
                            "MCP connector unavailable."
                        ],
                        "insufficient_context": True,
                    },
                    "workflow": workflow_info,
                }

            # -------------------------------------------------
            # Extract incident ID
            # -------------------------------------------------

            incident_id = None

            query_upper = query.upper()

            parts = query_upper.replace(
                ",",
                " ",
            ).split()

            for part in parts:

                cleaned = part.strip(
                    "?.:,;()[]{}"
                )

                if cleaned.startswith("INC-"):
                    incident_id = cleaned
                    break

            # -------------------------------------------------
            # Missing incident ID
            # -------------------------------------------------

            if incident_id is None:
                return {
                    "answer": (
                        "Please provide an incident ID, "
                        "for example INC-1001."
                    ),
                    "confidence_score": 0.0,
                    "citations": [],
                    "recommended_action": (
                        "Provide the incident ID."
                    ),
                    "validation": {
                        "is_valid": True,
                        "issues": [],
                        "insufficient_context": True,
                    },
                    "workflow": workflow_info,
                }

            # -------------------------------------------------
            # Call MCP connector
            # -------------------------------------------------

            tool_result = mcp_client.call_tool(
                "incident_status",
                incident_id=incident_id,
            )

            mcp_result = tool_result["result"]

            # -------------------------------------------------
            # Incident not found
            # -------------------------------------------------

            if not mcp_result.get("found", False):
                return {
                    "answer": mcp_result.get(
                        "message",
                        "Incident not found.",
                    ),
                    "confidence_score": 0.0,
                    "citations": [],
                    "recommended_action": (
                        "Verify the incident ID."
                    ),
                    "validation": {
                        "is_valid": True,
                        "issues": [],
                        "insufficient_context": True,
                    },
                    "workflow": workflow_info,
                }

            # -------------------------------------------------
            # Convert MCP result into readable evidence
            # -------------------------------------------------

            documents = [
                self._build_mcp_document(
                    tool_name="incident_status",
                    result=mcp_result,
                )
            ]

        # -------------------------------------------------
        # Unknown tool
        # -------------------------------------------------

        else:
            return {
                "answer": (
                    "The selected enterprise tool "
                    "is not available."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Try an enterprise knowledge base question."
                ),
                "validation": {
                    "is_valid": False,
                    "issues": [
                        "Selected tool is unavailable."
                    ],
                    "insufficient_context": True,
                },
                "workflow": workflow_info,
            }

        # -------------------------------------------------
        # Update evidence count
        # -------------------------------------------------

        workflow_info["retrieved_document_count"] = len(
            documents
        )

        # -------------------------------------------------
        # Grounded synthesis
        # -------------------------------------------------

        response = self.synthesis_engine.generate(
            query=query,
            documents=documents,
        )

        # -------------------------------------------------
        # Validation
        # -------------------------------------------------

        validated_response = AnswerValidator.validate(
            response
        )

        validated_response["workflow"] = workflow_info

        return validated_response