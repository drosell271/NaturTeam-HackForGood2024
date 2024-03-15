from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import uuid
from create_db import User, Event

app = FastAPI()

class JSON_Event_Input(BaseModel):
	name: str
	description: str
	image: Optional[str] = None
	latitude: float
	longitude: float
	creator_id: int

class JSON_Event_Output(BaseModel):
	id: int
	name: str
	description: str
	image: str
	latitude: float
	longitude: float
	creator_id: int
	created_at: datetime
	users_attending: int
	finished: bool

class JSON_Event_GPS(BaseModel):
	id: int
	latitude: float
	longitude: float

class JSON_Login(BaseModel):
	username: str
	password: str

async def generate_short_token():
    return str(uuid.uuid4())[:10]

token_user_mapping = {}

engine = create_engine('sqlite:///app/db/local.db')
Session = sessionmaker(bind=engine)
session = Session()

@app.post("/login")
async def login(form_data: JSON_Login):
    # Verify if the user exists in the database
    user = session.query(User).filter(User.username == form_data.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the password is correct
    if form_data.password == user.password:
        raise HTTPException(status_code=400, detail="Incorrect password")

    # If the password is correct, generate and return a short token
    token = await generate_short_token()
    token_user_mapping[token] = user.id  # Store the token with the user's ID
    return {"access_token": token}