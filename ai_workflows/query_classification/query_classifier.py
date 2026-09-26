from typing import Dict


class QueryClassifier:
    """
    Lightweight query classifier.

    Determines the likely intent, department and
    preferred knowledge source for an employee query.

    This intentionally uses simple rules first.
    We can replace or enhance this with an LLM-based
    classifier later without changing the rest of
    the workflow.
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