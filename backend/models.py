from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Hero(Base):
    __tablename__ = "heroes"

    hero_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    role = Column(String(10), nullable=False)  # 'Tank', 'DPS', or 'Support'
    icon_url = Column(String(255), nullable=True)

    powers = relationship("Power", back_populates="hero")
    items = relationship("Item", back_populates="hero")


class Power(Base):
    __tablename__ = "powers"

    power_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    icon_url = Column(String(255), nullable=True)
    hero_id = Column(Integer, ForeignKey("heroes.hero_id"), nullable=False)

    hero = relationship("Hero", back_populates="powers")


class Item(Base):
    __tablename__ = "items"

    item_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    category = Column(String(20), nullable=False)  # 'Weapon', 'Ability', 'Survival'
    tier = Column(String(10), nullable=False)      # 'Common', 'Rare', 'Epic'
    cost = Column(Integer, nullable=False)
    icon_url = Column(String(255), nullable=True)
    hero_id = Column(Integer, ForeignKey("heroes.hero_id"), nullable=True)  # NULL = generic item

    hero = relationship("Hero", back_populates="items")
