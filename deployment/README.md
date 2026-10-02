# Deployment

This folder contains deployment configuration and production deployment notes for the Infosys AI Knowledge Assistant.

## Backend

Platform: Render

The repository is a monorepo, so the Render backend service uses the repository root as its service root.

Build command:

pip install -r backend/requirements.txt

Start command:

cd backend && PYTHONPATH=.. uvicorn main:app --host 0.0.0.0 --port $PORT

## Frontend

Platform: Vercel

The frontend is deployed separately from the FastAPI backend.

The frontend must use the deployed backend URL through an environment variable rather than hard-coding a localhost URL.

## Required backend environment variables

DATABASE_URL
GOOGLE_API_KEY
JWT_SECRET_KEY

Additional environment variables should be configured according to backend/config/env_config.py.

## Required frontend environment variables

NEXT_PUBLIC_API_BASE_URL

Never commit production secrets to Git.
