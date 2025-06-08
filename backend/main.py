from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base, Hero
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/heroes")
def get_heroes():
    db: Session = SessionLocal()
    heroes = db.query(Hero).all()
    return heroes
