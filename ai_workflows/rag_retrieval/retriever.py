import os
from typing import Any, List, Tuple, Optional

from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from config.vector_db_config import (
    get_vector_db_path,
    get_vector_collection_name,
)


class EnterpriseRetriever:
    """
    Handles semantic retrieval from the enterprise
    vector database.

    Retrieval uses Chroma distance scores.

    Lower distance = higher semantic similarity.

    Documents whose distance is above the configured
    relevance threshold are rejected so unrelated
    documents are not passed to the LLM.
    """

    DEFAULT_RELEVANCE_THRESHOLD = 0.70

    def __init__(
        self,
        vector_db_path: Optional[str] = None,
        collection_name: Optional[str] = None,
        google_api_key: Optional[str] = None,
    ):
        api_key = (
            google_api_key
            or os.getenv("GOOGLE_API_KEY")
            or os.getenv("GEMINI_API_KEY")
        )

        if not api_key:
            raise ValueError(
                "GOOGLE_API_KEY or GEMINI_API_KEY "
                "is not configured."
            )

        if vector_db_path is None:
            vector_db_path = get_vector_db_path()

        if collection_name is None:
            collection_name = get_vector_collection_name()

        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=os.getenv(
                "EMBEDDING_MODEL",
                "gemini-embedding-2",
            ),
            google_api_key=api_key,
        )

        self.vector_db = Chroma(
            collection_name=collection_name,
            persist_directory=vector_db_path,
            embedding_function=self.embeddings,
        )

        self.relevance_threshold = float(
            os.getenv(
                "RETRIEVAL_RELEVANCE_THRESHOLD",
                str(self.DEFAULT_RELEVANCE_THRESHOLD),
            )
        )

    def search(
        self,
        query: str,
        top_k: int = 5,
        allowed_departments: Optional[List[str]] = None,
    ) -> List[Tuple[Any, float]]:
        """
        Retrieve only semantically relevant documents.

        Chroma returns distance scores where lower is better.
        Results above the relevance threshold are rejected.
        """

        if not query or not query.strip():
            return []

        metadata_filter = None

        if allowed_departments:
            metadata_filter = {
                "department": {
                    "$in": allowed_departments
                }
            }

        results = (
            self.vector_db.similarity_search_with_score(
                query=query.strip(),
                k=top_k,
                filter=metadata_filter,
            )
        )

        relevant_results = [
            (document, score)
            for document, score in results
            if document is not None
            and score <= self.relevance_threshold
        ]

        return relevant_results