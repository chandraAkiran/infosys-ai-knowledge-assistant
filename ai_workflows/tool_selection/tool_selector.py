from typing import Dict


class ToolSelector:
    """
    Selects the appropriate knowledge source or
    enterprise tool for a classified query.
    """

    @staticmethod
    def select(
        classification: Dict[str, str],
    ) -> Dict[str, str]:

        intent = classification.get(
            "intent",
            "general_question",
        )

        department = classification.get(
            "department",
            "unknown",
        )

        # -------------------------------------------------
        # MCP incident-status tool
        # -------------------------------------------------

        if intent == "incident_status_lookup":

            return {
                "tool": "incident_status",
                "department": department,
                "reason": (
                    "Query requires live incident information "
                    "from an enterprise connector."
                ),
            }

        # -------------------------------------------------
        # Knowledge/document questions
        # -------------------------------------------------

        if intent in {
            "knowledge_lookup",
            "document_search",
        }:

            return {
                "tool": "rag",
                "department": department,
                "reason": (
                    "Query can be answered from "
                    "the enterprise knowledge base."
                ),
            }

        # -------------------------------------------------
        # Default
        # -------------------------------------------------

        return {
            "tool": "rag",
            "department": department,
            "reason": (
                "Defaulting to enterprise knowledge "
                "retrieval."
            ),
        }