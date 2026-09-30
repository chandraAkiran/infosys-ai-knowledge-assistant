from sqlalchemy.orm import Session

from models.document_model import Document


def create_document(
    db: Session,
    document_name: str,
    department: str,
    document_type: str,
    access_level: str,
    source: str,
    effective_date=None,
    file_path: str | None = None,
):
    document = Document(
        document_name=document_name,
        department=department,
        document_type=document_type,
        access_level=access_level,
        source=source,
        effective_date=effective_date,
        indexing_status="pending",
        file_path=file_path,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_document_by_id(db: Session, document_id: int):
    return db.query(Document).filter(Document.id == document_id).first()


def get_documents(db: Session):
    return db.query(Document).order_by(Document.created_at.desc()).all()


def update_indexing_status(
    db: Session,
    document_id: int,
    indexing_status: str,
):
    document = get_document_by_id(db, document_id)

    if document is None:
        return None

    document.indexing_status = indexing_status

    db.commit()
    db.refresh(document)

    return document