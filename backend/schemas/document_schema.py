from datetime import datetime

from pydantic import BaseModel


class DocumentCreate(BaseModel):
    document_name: str
    department: str
    document_type: str
    access_level: str = "employee"
    source: str | None = None
    effective_date: str | None = None


class DocumentResponse(BaseModel):
    id: int
    document_name: str
    department: str
    document_type: str
    access_level: str
    source: str | None
    effective_date: str | None
    indexing_status: str
    file_path: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class DocumentStatusResponse(BaseModel):
    document_id: int
    indexing_status: str