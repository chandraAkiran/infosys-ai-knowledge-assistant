from typing import Dict


class QueryClassifier:
    """
    Lightweight query classifier.

    Determines the likely intent, department and
    preferred knowledge source for an employee query.

    MCP-specific intents are detected here so that
    the tool-selection layer can route those queries
    to the appropriate enterprise connector.
    """

    DEPARTMENT_KEYWORDS = {
        "Human Resources": [
            "leave",
            "salary",
            "employee",
            "hr",
            "holiday",
            "benefit",
            "attendance",
            "recruitment",
            "policy",
        ],

        "Engineering": [
            "api",
            "microservice",
            "deployment",
            "code",
            "architecture",
            "software",
            "database",
            "service",
            "technical",
        ],

        "Delivery Operations": [
            "delivery",
            "incident",
            "severity",
            "sla",
            "escalation",
            "production",
            "support",
            "operations",
        ],

        "PMO": [
            "project",
            "pmo",
            "milestone",
            "agile",
            "sprint",
            "planning",
            "execution",
        ],

        "Sales": [
            "sales",
            "client",
            "customer",
            "proposal",
            "revenue",
            "cloud",
            "capability",
        ],
    }

    @classmethod
    def classify(cls, query: str) -> Dict[str, str]:

        if not query or not query.strip():
            return {
                "intent": "invalid",
                "department": "unknown",
                "source": "none",
            }

        query_lower = query.lower()

        detected_department = "unknown"

        for department, keywords in cls.DEPARTMENT_KEYWORDS.items():

            for keyword in keywords:

                if keyword in query_lower:
                    detected_department = department
                    break

            if detected_department != "unknown":
                break

        # -------------------------------------------------
        # MCP incident-status query
        # -------------------------------------------------

        incident_status_phrases = [
            "incident status",
            "status of incident",
            "status for incident",
            "incident update",
            "incident updates",
            "current incident",
            "current status",
        ]

        if any(
            phrase in query_lower
            for phrase in incident_status_phrases
        ):
            return {
                "intent": "incident_status_lookup",
                "department": "Delivery Operations",
                "source": "mcp",
            }

        # Also detect explicit incident IDs.
        if (
            "inc-" in query_lower
            and "incident" in query_lower
            and any(
                word in query_lower
                for word in [
                    "status",
                    "update",
                    "state",
                ]
            )
        ):
            return {
                "intent": "incident_status_lookup",
                "department": "Delivery Operations",
                "source": "mcp",
            }

        # -------------------------------------------------
        # Normal enterprise knowledge queries
        # -------------------------------------------------

        if any(
            word in query_lower
            for word in [
                "what",
                "how",
                "when",
                "where",
                "which",
                "policy",
                "procedure",
            ]
        ):
            intent = "knowledge_lookup"

        elif any(
            word in query_lower
            for word in [
                "search",
                "find",
                "document",
                "manual",
            ]
        ):
            intent = "document_search"

        else:
            intent = "general_question"

        return {
            "intent": intent,
            "department": detected_department,
            "source": "enterprise_knowledge_base",
        }