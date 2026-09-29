from pydantic import BaseModel


class GovernanceSettings(BaseModel):
    require_source_citation: bool = True
    allow_external_connectors: bool = False
    minimum_confidence: float = 0.5
    require_approved_sources: bool = True


class GovernanceResponse(BaseModel):
    require_source_citation: bool
    allow_external_connectors: bool
    minimum_confidence: float
    require_approved_sources: bool