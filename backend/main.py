from fastapi import FastAPI

from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router


app = FastAPI(
    title="Infosys AI Knowledge Assistant",
    description="Backend API for the enterprise knowledge assistant.",
    version="1.0.0",
)


app.include_router(auth_router)
app.include_router(user_router)


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