from pathlib import Path
from typing import Any


def build_metadata(
    file_path: str,
    department: str,
    document_type: str,
    access_level: str,
    effective_date: str | None = None,
) -> dict[str, Any]:
    """
    Build document-level metadata for an ingested document.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if not department.strip():
        raise ValueError("department cannot be empty.")

    if not document_type.strip():
        raise ValueError("document_type cannot be empty.")

    if not access_level.strip():
        raise ValueError("access_level cannot be empty.")

    return {
        "document_name": path.name,
        "department": department.strip(),
        "document_type": document_type.strip(),
        "access_level": access_level.strip(),
        "source": str(path),
        "effective_date": effective_date,
    }