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

async def generate_short_token():
    return str(uuid.uuid4())[:10]

token_user_mapping = {}

@app.post("/login")
async def login(form_data: JSON_Login, db: Session = Depends(get_db)):
    # Verify if the user exists in the database
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the password is correct
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # If the password is correct, generate and return a short token
    token = await generate_short_token()
    token_user_mapping[token] = user.id  # Store the token with the user's ID
    return {"access_token": token}