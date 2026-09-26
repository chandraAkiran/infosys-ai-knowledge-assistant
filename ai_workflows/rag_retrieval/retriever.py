import os
from typing import Any, List, Tuple, Optional

from langchain_chroma import Chroma
from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings,
)


class EnterpriseRetriever:
    """
    Handles semantic retrieval from the enterprise
    vector database.

    IMPORTANT:
    This class only retrieves evidence.

    It does NOT:
    - call the LLM
    - generate answers
    - build citations
    - decide user permissions
    """

    def __init__(
        self,
        vector_db_path: Optional[str] = None,
        collection_name: str = "documents",
        google_api_key: Optional[str] = None,
    ):

        api_key = (
            google_api_key
            or os.getenv("GEMINI_API_KEY")
            or os.getenv("GOOGLE_API_KEY")
        )

        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY or GOOGLE_API_KEY "
                "is not configured."
            )

        if vector_db_path is None:
            vector_db_path = os.getenv(
                "CHROMA_DB_PATH",
                "./vector_db",
            )

        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=os.getenv(
                "EMBEDDING_MODEL",
                "gemini-embedding-2-preview",
            ),
            google_api_key=api_key,
        )

        self.vector_db = Chroma(
            collection_name=collection_name,
            persist_directory=vector_db_path,
            embedding_function=self.embeddings,
        )

    def search(
        self,
        query: str,
        top_k: int = 5,
        allowed_departments: Optional[List[str]] = None,
    ) -> List[Tuple[Any, float]]:

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

        return results