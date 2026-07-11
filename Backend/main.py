from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import user
from database import Base, engine

app = FastAPI(title="Odoo Hackathon API")


# Create database tables
Base.metadata.create_all(bind=engine)


# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # Change this later to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include user routes
app.include_router(user.router)


@app.get("/")
def home():
    return {"message": "Backend is running successfully!"}