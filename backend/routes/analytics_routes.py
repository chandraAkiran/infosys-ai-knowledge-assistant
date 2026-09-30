from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from config.db_session import get_db
from services.analytics_service import get_analytics_overview


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/overview")
def analytics_overview(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_analytics_overview(db)