from pathlib import Path


def extract_text_from_txt(file_path: str) -> str:
    """
    Read text from a TXT document.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    return path.read_text(encoding="utf-8").strip()