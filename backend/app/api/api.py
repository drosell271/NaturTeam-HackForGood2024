from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import uuid

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


@app.post("/login")
async def login(json: JSON_Login):
	pass
