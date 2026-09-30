from datetime import date

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user, require_permission
from config.db_session import get_db
from schemas.document_schema import DocumentResponse
from services.document_service import (
    create_document,
    get_document_by_id,
    get_documents,
)
from services.ingestion_service import ingest_document
from services.upload_service import save_uploaded_file


router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/upload", response_model=DocumentResponse)
def upload_document(
    file: UploadFile = File(...),
    department: str = Form(...),
    document_type: str = Form(...),
    access_level: str = Form(...),
    source: str = Form(...),
    effective_date: date | None = Form(None),
    db: Session = Depends(get_db),
    current_user=Depends(require_permission("manage_documents")),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File name is required.",
        )

    file_path = save_uploaded_file(file)

    document = create_document(
        db=db,
        document_name=file.filename,
        department=department,
        document_type=document_type,
        access_level=access_level,
        source=source,
        effective_date=effective_date,
        file_path=file_path,
    )

    return document


@router.get("/", response_model=list[DocumentResponse])
def list_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_documents(db)


@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = get_document_by_id(db, document_id)

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    return document


@router.post("/{document_id}/index")
def index_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_permission("manage_documents")),
):
    try:
        indexed_count = ingest_document(
            db=db,
            document_id=document_id,
        )

        return {
            "document_id": document_id,
            "status": "completed",
            "indexed_chunks": indexed_count,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=404,
            detail=str(error),
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Document indexing failed.",
        )