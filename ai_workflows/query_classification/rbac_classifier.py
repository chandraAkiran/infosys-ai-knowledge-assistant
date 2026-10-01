from typing import Dict, List


# ---------------------------------------------------------
# ROLE / DESIGNATION -> ALLOWED DEPARTMENTS
# ---------------------------------------------------------

ROLE_PERMISSIONS: Dict[str, List[str]] = {
    # -----------------------------------------------------
    # Application roles
    # -----------------------------------------------------

    "employee": [
        "Delivery Operations",
    ],

    "manager": [
        "Engineering",
        "Delivery Operations",
        "PMO",
        "Human Resources",
        "Sales",
    ],

    "admin": [
        "Engineering",
        "Delivery Operations",
        "PMO",
        "Human Resources",
        "Sales",
    ],

    # -----------------------------------------------------
    # Enterprise job designations
    # -----------------------------------------------------

    "Software Engineer": [
        "Engineering",
        "Delivery Operations",
        "PMO",
    ],

    "Senior Software Engineer": [
        "Engineering",
        "Delivery Operations",
        "PMO",
    ],

    "DevOps Lead": [
        "Engineering",
        "Delivery Operations",
    ],

    "Solutions Architect": [
        "Engineering",
        "Delivery Operations",
        "PMO",
    ],

    "Engineering Lead": [
        "Engineering",
        "Delivery Operations",
        "PMO",
    ],

    "Sales Executive": [
        "Sales",
        "Human Resources",
    ],

    "Business Development Manager": [
        "Sales",
        "PMO",
    ],

    "Account Manager": [
        "Sales",
    ],

    "Sales Enablement Lead": [
        "Sales",
        "Human Resources",
        "PMO",
    ],

    "Delivery Manager": [
        "Delivery Operations",
        "PMO",
        "Engineering",
    ],

    "PMO Lead": [
        "PMO",
        "Delivery Operations",
        "Engineering",
    ],

    "Operations Lead": [
        "Delivery Operations",
    ],

    "HR Associate": [
        "Human Resources",
    ],

    "HR Operations Lead": [
        "Human Resources",
    ],

    "Senior Manager": [
        "Engineering",
        "Delivery Operations",
        "PMO",
        "Human Resources",
        "Sales",
    ],
}


class QueryRBACClassifier:

    @staticmethod
    def get_allowed_departments(
        designation: str,
    ) -> List[str]:

        return ROLE_PERMISSIONS.get(
            designation,
            [],
        )

    @staticmethod
    def is_role_allowed(
        designation: str,
    ) -> bool:

        return designation in ROLE_PERMISSIONS