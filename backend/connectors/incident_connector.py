INCIDENTS = {
    "INC-1001": {
        "incident_id": "INC-1001",
        "status": "Investigating",
        "severity": "Severity 1",
        "service": "Enterprise API Gateway",
        "owner": "Delivery Operations",
        "last_updated": "2026-09-30 10:30",
    },
    "INC-1002": {
        "incident_id": "INC-1002",
        "status": "Resolved",
        "severity": "Severity 2",
        "service": "Employee Portal",
        "owner": "Engineering",
        "last_updated": "2026-09-30 09:15",
    },
}


def get_incident_status(
    incident_id: str,
):
    """
    Return information for an enterprise incident.
    """

    incident = INCIDENTS.get(
        incident_id.upper()
    )

    if incident is None:
        return {
            "found": False,
            "message": (
                f"No incident found for {incident_id}."
            ),
        }

    return {
        "found": True,
        **incident,
    }