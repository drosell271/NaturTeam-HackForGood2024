# models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime, ARRAY
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    creator_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, nullable=False)
    users_attending = Column(Integer)
    finished = Column(Boolean, nullable=False, default=False)
    
engine = create_engine('sqlite:///app/db/local.db')
Base.metadata.create_all(engine)
