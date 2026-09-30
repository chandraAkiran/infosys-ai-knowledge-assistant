from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from config.db_session import get_db
from schemas.feedback_schema import (
    FeedbackCreate,
    FeedbackResponse,
)
from services.feedback_service import create_feedback
from services.audit_service import create_audit_log


router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"],
)


@router.post(
    "",
    response_model=FeedbackResponse,
)
def submit_feedback(
    request: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user_id = int(current_user["user_id"])

    feedback = create_feedback(
        db=db,
        user_id=user_id,
        query=request.query,
        rating=request.rating,
        comment=request.comment,
    )

    create_audit_log(
        db=db,
        user_id=user_id,
        action="submit_feedback",
        resource_type="feedback",
        resource_id=feedback.id,
        details=f"Feedback rating: {request.rating}",
    )

    return feedback