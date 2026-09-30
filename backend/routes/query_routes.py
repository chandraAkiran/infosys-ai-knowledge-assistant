from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from config.db_session import get_db
from schemas.query_schema import (
    QueryRequest,
    QueryResponse,
)
from services.query_service import process_query
from services.audit_service import create_audit_log


router = APIRouter(
    prefix="/query",
    tags=["Query"],
)


@router.post(
    "",
    response_model=QueryResponse,
)
def process_employee_query(
    request: QueryRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Process an authenticated employee question
    through the complete AI workflow.
    """

    designation = current_user.get(
        "role",
        "employee",
    )

    result = process_query(
        query=request.query,
        designation=designation,
    )

    create_audit_log(
        db=db,
        user_id=int(current_user["user_id"]),
        action="query",
        resource_type="query",
        details=request.query,
    )

    return result