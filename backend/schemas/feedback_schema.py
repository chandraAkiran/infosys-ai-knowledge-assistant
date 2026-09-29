from datetime import datetime

from pydantic import BaseModel, Field


class FeedbackCreate(BaseModel):
    query: str = Field(min_length=1)
    rating: str
    comment: str | None = None


class FeedbackResponse(BaseModel):
    id: int
    user_id: int | None
    query: str
    rating: str
    comment: str | None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }