from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.db_init import initialize_tables

from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
from routes.document_routes import router as document_router
from routes.retrieval_routes import router as retrieval_router
from routes.query_routes import router as query_router
from routes.feedback_routes import router as feedback_router
from routes.analytics_routes import router as analytics_router
from routes.connector_routes import router as connector_router
from routes.admin_routes import router as admin_router


initialize_tables()


app = FastAPI(
    title="Infosys AI Knowledge Assistant",
    description="Backend API for the enterprise knowledge assistant.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(document_router)
app.include_router(retrieval_router)
app.include_router(query_router)
app.include_router(feedback_router)
app.include_router(analytics_router)
app.include_router(connector_router)
app.include_router(admin_router)


@app.get("/")
def root():
    return {
        "message": "Infosys AI Knowledge Assistant backend is running."
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}