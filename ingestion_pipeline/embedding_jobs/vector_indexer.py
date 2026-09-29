import os
from typing import Any

import chromadb
from google import genai


def create_embedding(text: str) -> list[float]:
    """
    Create a vector embedding for a piece of text.
    """

    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        raise ValueError("GOOGLE_API_KEY is not configured.")

    client = genai.Client(api_key=api_key)

    result = client.models.embed_content(
        model="gemini-embedding-2",
        contents=text,
    )

    return result.embeddings[0].values


def get_collection(
    persist_directory: str = "vector_db",
    collection_name: str = "enterprise_knowledge",
):
    """
    Get or create the Chroma collection used by the project.
    """

    client = chromadb.PersistentClient(
        path=persist_directory
    )

    collection = client.get_or_create_collection(
        name=collection_name
    )

    return collection


def index_chunks(
    chunks: list[str],
    metadata: dict[str, Any],
    persist_directory: str = "vector_db",
    collection_name: str = "enterprise_knowledge",
) -> int:
    """
    Embed chunks and store them with metadata in Chroma.
    """

    if not chunks:
        return 0

    collection = get_collection(
        persist_directory=persist_directory,
        collection_name=collection_name,
    )

    embeddings = []
    documents = []
    metadatas = []
    ids = []

    for index, chunk in enumerate(chunks):
        embedding = create_embedding(chunk)

        chunk_metadata = {
            **metadata,
            "chunk_id": f"{metadata['document_name']}-chunk-{index}",
        }

        embeddings.append(embedding)
        documents.append(chunk)
        metadatas.append(chunk_metadata)
        ids.append(chunk_metadata["chunk_id"])

    collection.upsert(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
    )

    return len(chunks)