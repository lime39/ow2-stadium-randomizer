from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from models import Base, Hero, Power, Item
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
def get_heroes(role: str = Query(None)):
    db: Session = SessionLocal()
    if role:
        heroes = db.query(Hero).filter(Hero.role == role).all()
    else:
        heroes = db.query(Hero).all()
    return heroes

@app.get("/powers")
def get_powers(hero_id: int = Query(...)):
    db: Session = SessionLocal()
    powers = db.query(Power).filter(Power.hero_id == hero_id).all()
    return powers

@app.get("/items")
def get_items(hero_id: int = Query(...)):
    db: Session = SessionLocal()
    items = db.query(Item).filter(
        (Item.hero_id == hero_id) | (Item.hero_id == None)
    ).all()
    return items