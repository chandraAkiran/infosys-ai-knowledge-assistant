from pydantic import BaseModel, Field


class QueryRequest(BaseModel):
    query: str = Field(min_length=1)


class QueryResponse(BaseModel):
    answer: str
    confidence_score: float
    citations: list
    recommended_action: str
    validation: dict
    workflow: dict