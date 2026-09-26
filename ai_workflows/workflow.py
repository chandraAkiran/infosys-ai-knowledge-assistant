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
        Retrieval
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

        self.synthesis_engine = (
            GroundedSynthesisEngine(
                google_api_key=google_api_key,
            )
        )

    def run(
        self,
        query: str,
        designation: str,
    ) -> Dict[str, Any]:

        # -------------------------------------------------
        # 1. Validate input
        # -------------------------------------------------

        if not query or not query.strip():

            return {
                "answer": (
                    "Please enter a valid question."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Enter a question about "
                    "enterprise knowledge."
                ),
            }

        # -------------------------------------------------
        # 2. Check employee role
        # -------------------------------------------------

        if not QueryRBACClassifier.is_role_allowed(
            designation
        ):

            return {
                "answer": (
                    "Your employee role is not "
                    "configured for this assistant."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Contact the administrator "
                    "to configure your role."
                ),
            }

        # -------------------------------------------------
        # 3. Classify query
        # -------------------------------------------------

        classification = (
            QueryClassifier.classify(
                query
            )
        )

        # -------------------------------------------------
        # 4. Determine allowed departments
        # -------------------------------------------------

        allowed_departments = (
            QueryRBACClassifier
            .get_allowed_departments(
                designation
            )
        )

        # -------------------------------------------------
        # 5. Select tool
        # -------------------------------------------------

        tool_selection = (
            ToolSelector.select(
                classification
            )
        )

        selected_tool = tool_selection[
            "tool"
        ]

        # -------------------------------------------------
        # 6. Currently only RAG is implemented
        # -------------------------------------------------

        if selected_tool != "rag":

            return {
                "answer": (
                    "The selected enterprise tool "
                    "is not available yet."
                ),
                "confidence_score": 0.0,
                "citations": [],
                "recommended_action": (
                    "Try an enterprise knowledge "
                    "base question."
                ),
            }

        # -------------------------------------------------
        # 7. Retrieve evidence
        # -------------------------------------------------

        retrieved_results = (
            self.retriever.search(
                query=query,
                top_k=5,
                allowed_departments=(
                    allowed_departments
                ),
            )
        )

        documents = [
            document
            for document, score
            in retrieved_results
            if document is not None
        ]

        # -------------------------------------------------
        # 8. Generate grounded answer
        # -------------------------------------------------

        response = (
            self.synthesis_engine.generate(
                query=query,
                documents=documents,
            )
        )

        # -------------------------------------------------
        # 9. Validate answer
        # -------------------------------------------------

        validated_response = (
            AnswerValidator.validate(
                response
            )
        )

        # -------------------------------------------------
        # 10. Attach workflow metadata
        # -------------------------------------------------

        validated_response[
            "workflow"
        ] = {
            "classification": classification,
            "allowed_departments": (
                allowed_departments
            ),
            "tool_selection": tool_selection,
            "retrieved_document_count": (
                len(documents)
            ),
        }

        return validated_response