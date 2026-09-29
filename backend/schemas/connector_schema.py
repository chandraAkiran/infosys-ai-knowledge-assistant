from datetime import datetime

from pydantic import BaseModel


class ConnectorCreate(BaseModel):
    name: str
    connector_type: str
    description: str | None = None
    is_enabled: bool = False
    status: str = "planned"


class ConnectorResponse(BaseModel):
    id: int
    name: str
    connector_type: str
    description: str | None
    is_enabled: bool
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }