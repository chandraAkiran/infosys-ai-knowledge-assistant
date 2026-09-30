from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth.dependencies import require_permission
from config.db_session import get_db
from models.connector_model import Connector

router = APIRouter(prefix="/connectors", tags=["Connectors"])


@router.get("/")
def list_connectors(
    db: Session = Depends(get_db),
    current_user=Depends(require_permission("manage_connectors")),
):
    return db.query(Connector).order_by(Connector.created_at.desc()).all()


@router.post("/")
def create_connector(
    name: str,
    connector_type: str,
    description: str = "",
    db: Session = Depends(get_db),
    current_user=Depends(require_permission("manage_connectors")),
):
    existing = db.query(Connector).filter(Connector.name == name).first()

    if existing:
        raise HTTPException(status_code=400, detail="Connector already exists.")

    connector = Connector(
        name=name,
        connector_type=connector_type,
        description=description,
        is_enabled=True,
        status="active",
    )

    db.add(connector)
    db.commit()
    db.refresh(connector)

    return connector


@router.patch("/{connector_id}/status")
def update_connector_status(
    connector_id: int,
    is_enabled: bool,
    db: Session = Depends(get_db),
    current_user=Depends(require_permission("manage_connectors")),
):
    connector = (
        db.query(Connector)
        .filter(Connector.id == connector_id)
        .first()
    )

    if connector is None:
        raise HTTPException(status_code=404, detail="Connector not found.")

    connector.is_enabled = is_enabled
    connector.status = "active" if is_enabled else "disabled"

    db.commit()
    db.refresh(connector)

    return connector