from ai_workflows.rag_retrieval.retriever import EnterpriseRetriever


def retrieve_documents(
    query: str,
    top_k: int = 5,
    allowed_departments: list[str] | None = None,
):
    """
    Retrieve relevant enterprise knowledge chunks.

    This service connects the backend API layer
    with the existing AI retrieval workflow.
    """

    retriever = EnterpriseRetriever()

    results = retriever.search(
        query=query,
        top_k=top_k,
        allowed_departments=allowed_departments,
    )

    retrieved_documents = []

    for document, score in results:
        retrieved_documents.append(
            {
                "content": document.page_content,
                "score": float(score),
                "metadata": document.metadata,
            }
        )

    return retrieved_documents