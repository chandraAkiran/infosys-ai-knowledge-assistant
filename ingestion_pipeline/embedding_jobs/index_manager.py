from typing import Any

from ingestion_pipeline.embedding_jobs.vector_indexer import (
    get_collection,
    index_chunks,
)


def index_document(
    chunks: list[str],
    metadata: dict[str, Any],
) -> int:
    """
    Index all chunks belonging to a document.
    """

    return index_chunks(
        chunks=chunks,
        metadata=metadata,
    )


def get_index_count() -> int:
    """
    Return the number of indexed chunks.
    """

    collection = get_collection()

    return collection.count()


def clear_index() -> None:
    """
    Delete all indexed records from the collection.
    """

    collection = get_collection()

    existing = collection.get()

    ids = existing.get("ids", [])

    if ids:
        collection.delete(ids=ids)