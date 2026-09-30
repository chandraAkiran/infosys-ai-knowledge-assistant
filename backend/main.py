from fastapi import FastAPI

from config.db_init import initialize_tables
from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
from routes.document_routes import router as document_router
from routes.retrieval_routes import router as retrieval_router
from routes.query_routes import router as query_router
from routes.feedback_routes import router as feedback_router
from routes.analytics_routes import router as analytics_router

initialize_tables()

app = FastAPI(
    title="Infosys AI Knowledge Assistant",
    description="Backend API for the enterprise knowledge assistant.",
    version="1.0.0",
)


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(document_router)
app.include_router(retrieval_router)
app.include_router(query_router)
app.include_router(feedback_router)
app.include_router(analytics_router)

@app.get("/")
def root():
    return {
        "message": "Infosys AI Knowledge Assistant backend is running."
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }