from typing import Any, Dict

from backend.connectors.connector_registry import connector_registry


class MCPClient:
    """
    Lightweight MCP-style client abstraction.

    It discovers registered enterprise tools and
    executes the selected tool through the registry.
    """

    def list_tools(self):
        return connector_registry.list_connectors()

    def has_tool(self, tool_name: str) -> bool:
        return connector_registry.is_registered(tool_name)

    def call_tool(
        self,
        tool_name: str,
        **kwargs: Any,
    ) -> Dict[str, Any]:
        handler = connector_registry.get(tool_name)

        if handler is None:
            raise ValueError(
                f"MCP tool '{tool_name}' is not registered."
            )

        result = handler(**kwargs)

        return {
            "tool": tool_name,
            "result": result,
        }


mcp_client = MCPClient()