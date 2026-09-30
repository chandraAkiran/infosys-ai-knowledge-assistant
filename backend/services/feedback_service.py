from sqlalchemy.orm import Session

from models.feedback_model import Feedback


def create_feedback(
    db: Session,
    user_id: int,
    query: str,
    rating: int,
    comment: str | None = None,
):
    feedback = Feedback(
        user_id=user_id,
        query=query,
        rating=rating,
        comment=comment,
    )

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return feedback


def get_feedback(
    db: Session,
):
    return (
        db.query(Feedback)
        .order_by(Feedback.created_at.desc())
        .all()
    )