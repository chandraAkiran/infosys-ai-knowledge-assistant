from connectors.mcp_client import mcp_client
from ai_workflows.query_classification.query_classifier import (
    QueryClassifier,
)
from ai_workflows.tool_selection.tool_selector import (
    ToolSelector,
)


def test_incident_query_is_classified_for_mcp():

    result = QueryClassifier.classify(
        "What is the current status of incident INC-1001?"
    )

    assert result["intent"] == "incident_status_lookup"
    assert result["department"] == "Delivery Operations"
    assert result["source"] == "mcp"


def test_incident_query_selects_mcp_tool():

    classification = {
        "intent": "incident_status_lookup",
        "department": "Delivery Operations",
        "source": "mcp",
    }

    result = ToolSelector.select(
        classification
    )

    assert result["tool"] == "incident_status"


def test_mcp_incident_connector():

    assert mcp_client.has_tool(
        "incident_status"
    )

    result = mcp_client.call_tool(
        "incident_status",
        incident_id="INC-1001",
    )

    assert result["tool"] == "incident_status"
    assert result["result"]["found"] is True
    assert result["result"]["incident_id"] == "INC-1001"
    assert result["result"]["status"] == "Investigating"


def test_unknown_incident():

    result = mcp_client.call_tool(
        "incident_status",
        incident_id="INC-9999",
    )

    assert result["result"]["found"] is False