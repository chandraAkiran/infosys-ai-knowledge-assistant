from pydantic import BaseModel, Field


class RetrievalRequest(BaseModel):
    query: str = Field(min_length=1)
    department: str | None = None


class CitationSchema(BaseModel):
    source: str
    document_name: str
    chunk_id: str | None = None
    page: int | None = None


class RetrievalResponse(BaseModel):
    answer: str
    confidence: float
    citations: list[CitationSchema] = []
    sources: list[str] = []