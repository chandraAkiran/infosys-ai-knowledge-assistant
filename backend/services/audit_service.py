from sqlalchemy.orm import Session

from models.audit_model import AuditLog


def create_audit_log(
    db: Session,
    user_id: int | None,
    action: str,
    resource_type: str,
    resource_id: int | None = None,
    details: str | None = None,
):
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        details=details,
    )

    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)

    return audit_log


def get_audit_logs(
    db: Session,
):
    return (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .all()
    )