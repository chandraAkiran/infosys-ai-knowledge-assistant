from typing import Callable, Dict, Any

from connectors.incident_connector import (
    get_incident_status,
)


class ConnectorRegistry:
    """
    Registry for enterprise tools/connectors.
    """

    def __init__(self):
        self._connectors: Dict[
            str,
            Callable[..., Any],
        ] = {}

    def register(
        self,
        name: str,
        handler: Callable[..., Any],
    ):
        self._connectors[name] = handler

    def get(
        self,
        name: str,
    ):
        return self._connectors.get(name)

    def list_connectors(self):
        return list(self._connectors.keys())

    def is_registered(
        self,
        name: str,
    ) -> bool:
        return name in self._connectors


connector_registry = ConnectorRegistry()


connector_registry.register(
    "incident_status",
    get_incident_status,
)