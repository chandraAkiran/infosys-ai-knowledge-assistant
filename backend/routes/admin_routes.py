from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import require_permission
from config.db_session import get_db
from schemas.governance_schema import GovernanceResponse, GovernanceSettings
from services.audit_service import get_audit_logs
from services.governance_service import (
    get_governance_settings,
    update_governance_settings,
)

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/governance", response_model=GovernanceResponse)
def get_governance(
    current_user=Depends(require_permission("manage_governance")),
):
    return get_governance_settings()


@router.put("/governance", response_model=GovernanceResponse)
def update_governance(
    settings: GovernanceSettings,
    current_user=Depends(require_permission("manage_governance")),
):
    return update_governance_settings(settings)


@router.get("/audit-logs")
def list_audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(require_permission("view_audit_logs")),
):
    return get_audit_logs(db)