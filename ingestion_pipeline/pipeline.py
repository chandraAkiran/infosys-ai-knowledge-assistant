from ingestion_pipeline.parsers.pdf_parser import extract_text_from_pdf
from ingestion_pipeline.chunking.chunker import chunk_text
from ingestion_pipeline.metadata.metadata_builder import build_metadata
from ingestion_pipeline.embedding_jobs.index_manager import index_document


def ingest_pdf(
    file_path: str,
    department: str,
    document_type: str,
    access_level: str,
    effective_date: str | None = None,
) -> int:
    """
    Run the complete ingestion pipeline for a PDF.
    """

    # 1. Extract text
    text = extract_text_from_pdf(file_path)

    # 2. Split text into chunks
    chunks = chunk_text(text)

    # 3. Build document metadata
    metadata = build_metadata(
        file_path=file_path,
        department=department,
        document_type=document_type,
        access_level=access_level,
        effective_date=effective_date,
    )

    # 4. Create embeddings and store in Chroma
    indexed_count = index_document(
        chunks=chunks,
        metadata=metadata,
    )

    return indexed_count