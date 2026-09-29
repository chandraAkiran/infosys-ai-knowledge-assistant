from fastapi import FastAPI

app = FastAPI(
    title="Infosys AI Knowledge Assistant",
    description="Backend API for the enterprise knowledge assistant.",
    version="1.0.0",
)


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