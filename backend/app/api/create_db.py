# models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime, Table
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine

Base = declarative_base()

user_event_association = Table('user_event_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('event_id', Integer, ForeignKey('events.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    events_attended = relationship("Event", 
                                    secondary=user_event_association, 
                                    back_populates="attendees")

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    estimated = Column(Integer, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    creator_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, nullable=False)
    cleaning_at = Column(DateTime, nullable=True)
    finished = Column(Boolean, nullable=False, default=False)
    attendees = relationship("User", 
                             secondary=user_event_association, 
                             back_populates="events_attended")
    
engine = create_engine('sqlite:///app/db/local.db')
Base.metadata.create_all(engine)
