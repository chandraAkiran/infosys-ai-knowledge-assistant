from fastapi import APIRouter, Depends, HTTPException

from auth.dependencies import get_current_user
from schemas.retrieval_schema import RetrievalRequest
from services.retrieval_service import retrieve_documents


router = APIRouter(
    prefix="/retrieval",
    tags=["Retrieval"],
)


@router.post("/query")
def query_retrieval(
    request: RetrievalRequest,
    current_user=Depends(get_current_user),
):
    """
    Retrieve relevant enterprise knowledge
    for an authenticated user.
    """

    try:
        allowed_departments = None

        if request.department:
            allowed_departments = [request.department]

        results = retrieve_documents(
            query=request.query,
            top_k=5,
            allowed_departments=allowed_departments,
        )

        return {
            "query": request.query,
            "results": results,
            "result_count": len(results),
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Retrieval failed.",
        )