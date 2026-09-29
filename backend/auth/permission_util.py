ROLE_PERMISSIONS = {
    "employee": {
        "query",
        "view_sources",
        "submit_feedback",
    },
    "manager": {
        "query",
        "view_sources",
        "submit_feedback",
        "view_team_analytics",
    },
    "admin": {
        "query",
        "view_sources",
        "submit_feedback",
        "view_team_analytics",
        "manage_users",
        "manage_documents",
        "manage_connectors",
        "view_audit_logs",
        "manage_governance",
    },
}


def has_permission(
    role: str,
    permission: str,
) -> bool:

    permissions = ROLE_PERMISSIONS.get(role, set())

    return permission in permissions


def get_permissions(role: str) -> set[str]:

    return ROLE_PERMISSIONS.get(role, set())