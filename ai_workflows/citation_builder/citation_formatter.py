from typing import Any, List

from pydantic import BaseModel, Field


class Citation(BaseModel):

    document_name: str = Field(
        description="Name of the source document."
    )

    page_number: int = Field(
        description="Page number of the source."
    )

    department: str = Field(
        description="Department associated with the source."
    )

    matched_passage: str = Field(
        description="Relevant passage from the source."
    )


class GroundedResponseSchema(BaseModel):

    answer: str = Field(
        description="Answer based only on supplied evidence."
    )

    confidence_score: float = Field(
        description="Confidence score between 0 and 1."
    )

    citations: List[Citation] = Field(
        description="Sources supporting the answer."
    )

    recommended_action: str = Field(
        description="Recommended next action for the employee."
    )


class CitationContextBuilder:

    @staticmethod
    def build_context_block(
        docs: List[Any],
    ) -> str:

        context_blocks = []

        for index, doc in enumerate(
            docs,
            start=1,
        ):

            metadata = doc.metadata

            block = (
                f"[SOURCE {index}]\n"
                f"Document: "
                f"{metadata.get('title', 'Unknown')}\n"
                f"Page: "
                f"{metadata.get('page_number', 'N/A')}\n"
                f"Department: "
                f"{metadata.get('department', 'Unknown')}\n"
                f"Source System: "
                f"{metadata.get('source_system', 'Unknown')}\n"
                f"Content:\n"
                f"{doc.page_content.strip()}\n"
            )

            context_blocks.append(block)

        return "\n\n".join(context_blocks)