from ai_workflows.tool_selection.tool_selector import (
    ToolSelector,
)


def test_knowledge_query_uses_rag():

    classification = {
        "intent": "knowledge_lookup",
        "department": "Human Resources",
        "source": "enterprise_knowledge_base",
    }

    result = ToolSelector.select(
        classification
    )

    assert result["tool"] == "rag"