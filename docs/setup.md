# Setup Guide

## Prerequisites

- Python 3.12+
- Node.js
- Git
- PostgreSQL or access to PostgreSQL
- VS Code

## Clone Repository

```bash
git clone https://github.com/pulkitn-analytics/infosys-ai-knowledge-assistant.git
cd infosys-ai-knowledge-assistant
```

## Backend

Create a virtual environment and install the backend dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
```

Configure the required values in backend\.env.

Important variables:

```text
GOOGLE_API_KEY
DATABASE_URL
JWT_SECRET_KEY
VECTOR_DB_PATH
VECTOR_COLLECTION_NAME
LLM_MODEL
EMBEDDING_MODEL
```

## Run Backend

```powershell
cd backend
$env:PYTHONPATH=".."
uvicorn main:app --reload
```

Backend: http://localhost:8000

Swagger: http://localhost:8000/docs

## Frontend

From the repository root:

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Frontend: http://localhost:3000

## Testing

```powershell
pytest -q
```

## Document Indexing

Administrators can upload documents and index them into the vector database through the application.

Never commit API keys, database credentials, JWT secrets, or production environment files.
