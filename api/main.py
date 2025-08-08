from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.metrics import router as metrics_router

app = FastAPI(title="FollowEconomy API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://followeconomy.com", "https://www.followeconomy.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(metrics_router)

@app.get("/")
def health_check():
    return {"status": "ok", "service": "followeconomy-api"}