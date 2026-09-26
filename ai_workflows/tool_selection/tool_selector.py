from typing import Dict


class ToolSelector:
    """
    Selects the appropriate knowledge source/tool
    for a user query.
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
        # Future MCP/tool-based questions
        # -------------------------------------------------

        return {
            "tool": "rag",
            "department": department,
            "reason": (
                "Defaulting to enterprise knowledge "
                "retrieval."
            ),
        }