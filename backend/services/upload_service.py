from pathlib import Path

from fastapi import UploadFile


UPLOAD_DIRECTORY = Path("uploads")


def save_uploaded_file(file: UploadFile) -> str:
    UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

    file_path = UPLOAD_DIRECTORY / file.filename

    with file_path.open("wb") as buffer:
        buffer.write(file.file.read())

    return str(file_path)