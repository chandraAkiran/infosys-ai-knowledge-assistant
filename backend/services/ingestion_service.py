from pathlib import Path

from sqlalchemy.orm import Session

from ingestion_pipeline.pipeline import ingest_pdf
from services.document_service import (
    get_document_by_id,
    update_indexing_status,
)


BACKEND_DIR = Path(__file__).resolve().parent.parent


def ingest_document(
    db: Session,
    document_id: int,
) -> int:
    """
    Run the ingestion pipeline for a stored document
    and update its indexing status.
    """

    # 1. Get document record from PostgreSQL
    document = get_document_by_id(db, document_id)

    if document is None:
        raise ValueError("Document not found.")

    # 2. Mark document as processing
    update_indexing_status(
        db,
        document_id,
        "processing",
    )

    try:
        # 3. Resolve the uploaded file path
        file_path = Path(document.file_path)

        if not file_path.is_absolute():
            file_path = BACKEND_DIR / file_path

        if not file_path.exists():
            raise FileNotFoundError(
                f"File not found: {file_path}"
            )

        # 4. Run the existing ingestion pipeline
        indexed_count = ingest_pdf(
            file_path=str(file_path),
            department=document.department,
            document_type=document.document_type,
            access_level=document.access_level,
            effective_date=(
                str(document.effective_date)
                if document.effective_date
                else None
            ),
        )

        # 5. Mark indexing as completed
        update_indexing_status(
            db,
            document_id,
            "completed",
        )

        return indexed_count

    except Exception:
        # 6. Mark indexing as failed
        update_indexing_status(
            db,
            document_id,
            "failed",
        )

        raise