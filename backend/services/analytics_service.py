from sqlalchemy.orm import Session

from models.feedback_model import Feedback
from models.audit_model import AuditLog


def get_analytics_overview(
    db: Session,
):
    total_feedback = (
        db.query(Feedback)
        .count()
    )

    positive_feedback = (
        db.query(Feedback)
        .filter(Feedback.rating >= 4)
        .count()
    )

    negative_feedback = (
        db.query(Feedback)
        .filter(Feedback.rating <= 2)
        .count()
    )

    total_queries = (
        db.query(AuditLog)
        .filter(AuditLog.action == "query")
        .count()
    )

    total_audit_events = (
        db.query(AuditLog)
        .count()
    )

    return {
        "total_queries": total_queries,
        "total_feedback": total_feedback,
        "positive_feedback": positive_feedback,
        "negative_feedback": negative_feedback,
        "total_audit_events": total_audit_events,
    }