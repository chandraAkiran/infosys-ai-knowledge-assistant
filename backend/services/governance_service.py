from schemas.governance_schema import GovernanceResponse, GovernanceSettings


_governance_settings = GovernanceSettings()


def get_governance_settings() -> GovernanceResponse:
    return GovernanceResponse(**_governance_settings.model_dump())


def update_governance_settings(
    settings: GovernanceSettings,
) -> GovernanceResponse:
    global _governance_settings

    _governance_settings = settings

    return GovernanceResponse(**_governance_settings.model_dump())