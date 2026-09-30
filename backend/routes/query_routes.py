from fastapi import APIRouter, Depends

from auth.dependencies import get_current_user
from schemas.query_schema import (
    QueryRequest,
    QueryResponse,
)
from services.query_service import process_query


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

    return process_query(
        query=request.query,
        designation=designation,
    )