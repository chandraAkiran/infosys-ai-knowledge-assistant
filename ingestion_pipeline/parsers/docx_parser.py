from pathlib import Path

from docx import Document


def extract_text_from_docx(file_path: str) -> str:
    """
    Extract text from paragraphs in a DOCX document.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    document = Document(path)

    paragraphs = []

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()

        if text:
            paragraphs.append(text)

    return "\n\n".join(paragraphs)