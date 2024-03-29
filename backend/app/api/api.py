from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from sqlalchemy import create_engine, update
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
import uuid
from .create_db import User, Event, user_event_association
from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import black, blue
import os

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # Permite las solicitudes desde el puerto 3000
	allow_credentials=True,
	allow_methods=["*"],  # Permite todos los métodos
	allow_headers=["*"],  # Permite todos los encabezados
)

class JSON_Event_Input(BaseModel):
	name: str
	description: str
	image: Optional[str]
	estimated: int
	latitude: float
	longitude: float
	cleaning_at: Optional[datetime]

class JSON_Event_Output(BaseModel):
	id: int
	name: str
	description: str
	image: str
	estimated: int
	latitude: float
	longitude: float
	creator_id: int
	created_at: datetime
	cleaning_at: Optional[datetime] = None
	finished: bool
	attendees_count: int

class JSON_Event_GPS(BaseModel):
	id: int
	latitude: float
	longitude: float

class JSON_Login(BaseModel):
	username: str
	password: str

class My_Events(BaseModel):
	created_by_me: List[JSON_Event_Output]
	attended_by_me: List[JSON_Event_Output]
	history: List[JSON_Event_Output]
	hours: int
	


async def generate_short_token():
	return str(uuid.uuid4())[:10]

token_user_mapping = {}

engine = create_engine('sqlite:///app/db/local.db')
Session = sessionmaker(bind=engine)
session = Session()



@app.post("/register")
async def register(form_data: JSON_Login):
	user = session.query(User).filter(User.username == form_data.username).first()
	if user:
		raise HTTPException(status_code=400, detail="User already exists")

	user = User(username=form_data.username, password=form_data.password)
	session.add(user)
	session.commit()
	return {"message": "User created"}

@app.post("/login")
async def login(form_data: JSON_Login):
	user = session.query(User).filter(User.username == form_data.username).first()
	if not user:
		raise HTTPException(status_code=404, detail="User not found")

	if form_data.password != user.password:
		raise HTTPException(status_code=400, detail="Incorrect password")

	token = await generate_short_token()
	token_user_mapping[token] = user.id
	return {"message": "Logged in", "access_token": token}

@app.post('/logout/token={token}')
async def logout(token: str):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	del token_user_mapping[token]
	return {"message": "Logged out"}



@app.post('/event/create/token={token}')
async def create_event(token: str, form_data: JSON_Event_Input):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]

	image_url = form_data.image if form_data.image is not None else "/images/default.jpg"

	event = Event(
		name=form_data.name,
		description=form_data.description,
		image=image_url,
		estimated=form_data.estimated,
		latitude=form_data.latitude,
		longitude=form_data.longitude,
		creator_id=user_id,
		created_at=datetime.now(),
		cleaning_at=form_data.cleaning_at
	)

	session.add(event)
	session.commit()

	return {"message": "Event created"}

@app.delete('/event/delete/event_id={event_id}/token={token}')
async def delete_event(token: str, event_id: int):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]
	event = session.query(Event).filter(Event.id == event_id).first()
	if not event:
		raise HTTPException(status_code=404, detail="Event not found")
	if event.creator_id != user_id:
		raise HTTPException(status_code=400, detail="You are not the creator of this event")
	session.delete(event)
	session.commit()
	return {"message": "Event deleted"}

@app.get('/event/get/all/token={token}', response_model=List[JSON_Event_Output])
async def get_all_events(token: str):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	events = session.query(Event).all()
	return [
		JSON_Event_Output(
			id=event.id,
			name=event.name,
			description=event.description,
			image=event.image,
			estimated=event.estimated,
			latitude=event.latitude,
			longitude=event.longitude,
			creator_id=event.creator_id,
			created_at=event.created_at,
			cleaning_at=event.cleaning_at,
			finished=event.finished,
			attendees_count=event.attendees_count
		) for event in events  if not event.finished
	]

@app.get('/event/get/coordinates/token={token}', response_model=List[JSON_Event_GPS])
async def get_all_events(token: str):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]
	events = session.query(Event).all()
	return [JSON_Event_GPS(id=event.id, latitude=event.latitude, longitude=event.longitude) for event in events if not event.finished]

@app.get('/event/get/id={event_id}/token={token}', response_model=JSON_Event_Output)
async def get_event(token: str, event_id: int):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]
	event = session.query(Event).filter(Event.id == event_id).first()
	if not event:
		raise HTTPException(status_code=404, detail="Event not found")
	return JSON_Event_Output(
			id=event.id,
			name=event.name,
			description=event.description,
			image=event.image,
			estimated=event.estimated,
			latitude=event.latitude,
			longitude=event.longitude,
			creator_id=event.creator_id,
			created_at=event.created_at,
			cleaning_at=event.cleaning_at,
			finished=event.finished,
			attendees_count=event.attendees_count
		)

@app.get('/event/get/my-events/token={token}', response_model=My_Events)
async def get_my_events(token: str):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")

	user_id = token_user_mapping[token]
	user = session.query(User).filter(User.id == user_id).first()
	if not user:
		raise HTTPException(status_code=404, detail="User not found")

	created_by_me = session.query(Event).filter(Event.creator_id == user_id).all()
	attended_by_me = user.events_attended


	return My_Events(
		created_by_me=[
			JSON_Event_Output(
				id=event.id,
				name=event.name,
				description=event.description,
				image=event.image,
				estimated=event.estimated,
				latitude=event.latitude,
				longitude=event.longitude,
				creator_id=event.creator_id,
				created_at=event.created_at,
				cleaning_at=event.cleaning_at,
				finished=event.finished,
				attendees_count=event.attendees_count
			) for event in created_by_me
		],
		attended_by_me=[
			JSON_Event_Output(
				id=event.id,
				name=event.name,
				description=event.description,
				image=event.image,
				estimated=event.estimated,
				latitude=event.latitude,
				longitude=event.longitude,
				creator_id=event.creator_id,
				created_at=event.created_at,
				cleaning_at=event.cleaning_at,
				finished=event.finished,
				attendees_count=event.attendees_count
			) for event in attended_by_me if not event.finished
		],
		history=[
			JSON_Event_Output(
				id=event.id,
				name=event.name,
				description=event.description,
				image=event.image,
				estimated=event.estimated,
				latitude=event.latitude,
				longitude=event.longitude,
				creator_id=event.creator_id,
				created_at=event.created_at,
				cleaning_at=event.cleaning_at,
				finished=event.finished,
				attendees_count=event.attendees_count
			) for event in attended_by_me if event.finished
		],
		hours=user.hours
	)


@app.post('/event/change-attend/event_id={event_id}/token={token}')
async def attend_event(token: str, event_id: int):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]
	user = session.query(User).filter(User.id == user_id).first()
	event = session.query(Event).filter(Event.id == event_id).first()
	
	if not user or not event:
		raise HTTPException(status_code=404, detail="Event not found")

	if user in event.attendees:
		event.attendees.remove(user)
		event.attendees_count -= 1
		action_message = "You are no longer attending this event."
	else:
		event.attendees.append(user)
		event.attendees_count += 1
		action_message = "You are now attending this event."

	session.commit()
	return {action_message}

@app.post('/event/finish/event_id={event_id}/token={token}')
async def finish_event(token: str, event_id: int):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]
	event = session.query(Event).filter(Event.id == event_id).first()
	if not event:
		raise HTTPException(status_code=404, detail="Event not found")
	event.finished = True
	session.commit()
	return {"message": "Event finished"}

@app.post('/event/attend/event_id={event_id}/user={user}/token={token}')
async def attend_event(token: str, event_id: int, user: int):
	if token not in token_user_mapping:
		raise HTTPException(status_code=404, detail="Token not found")
	user_id = token_user_mapping[token]
	event = session.query(Event).filter(Event.id == event_id).first()
	if not event:
		raise HTTPException(status_code=404, detail="Event not found")
	if user_id != event.creator_id:
		raise HTTPException(status_code=400, detail="You are not the creator of this event")
	user = session.query(User).filter(User.id == user).first()
	if not user:
		raise HTTPException(status_code=404, detail="User not found")
	
	registro = session.query(user_event_association).filter_by(user_id=user_id, event_id=event_id).first()
	if registro:
		stmt = update(user_event_association).where(
			user_event_association.c.user_id == user_id,
			user_event_association.c.event_id == event_id
		).values(atended=True)
		user.hours += event.estimated
		session.execute(stmt)
		session.commit()
		return {"message": "Registro actualizado."}
	else:
		return {"message": "Registro no encontrado."}


from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import black, blue, green, HexColor
from reportlab.pdfgen import canvas
from datetime import datetime
from fastapi.responses import FileResponse
from fastapi import HTTPException
import os

@app.get('/certificado/token={token}')
async def generar_y_descargar_certificado(token: str):
    if token not in token_user_mapping:
        raise HTTPException(status_code=404, detail="Token not found")
    user_id = token_user_mapping[token]
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    pdf_path = "certificado_reconocimiento.pdf"

    # Rotar la página 90 grados
    c = canvas.Canvas(pdf_path, pagesize=(letter[1], letter[0]))
    
	# Establecer el color de fondo
    c.setFillColor(HexColor("#ccffcc"))  # Color verde claro
    c.rect(0, 0, letter[1], letter[0], fill=1)

    # Establecer el color de la fuente
    c.setFillColor(black)

    # Añadir título y logo
    title = "Naturteam"
    logo_path = "app/db/logo.jpg"  # Ruta de tu archivo de imagen del logo

    # Ajustar el tamaño y la posición del título
    title_font_size = 24
    title_width = c.stringWidth(title, "Helvetica-Bold", title_font_size)
    title_start_x = (letter[1] - title_width) / 2
    title_start_y = 700

    # Añadir el título centrado horizontalmente
    c.setFont("Helvetica-Bold", title_font_size)
    c.drawString(title_start_x, title_start_y, title)

    # Añadir el logo al lado del título
    logo_width = 100
    logo_height = 100
    logo_start_x = title_start_x + title_width + 20
    logo_start_y = title_start_y - (logo_height / 2)
    c.drawImage(logo_path, logo_start_x, logo_start_y, width=logo_width, height=logo_height)

    # Añadir el texto
    text_start_x = 50
    text_start_y = 500
    line_height = 14
    lines = [
        "",
        "                             NaturTeam",
        "",
        "",
        "",
        "",
        f"Hace constar su reconocimiento a {user.username} por su labor",
        "",
        " y compromiso con la ecología y el respeto al medio ambiente.",
        "",
        f"con un total de {user.hours} horas de actividad voluntaria.",
        "",
    ]

    for line in lines:
        c.drawString(text_start_x, text_start_y, line)
        text_start_y -= line_height

    # Añadir la fecha y firma
    c.setFillColor(blue)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(100, 150, f"Fecha: {datetime.now().strftime('%d/%m/%Y')}")
    c.drawString(100, 100, "Firmado el equipo de NaturTeam")
    c.line(150, 95, 300, 95)

    c.save()

    # Verifica si el PDF existe
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=500, detail="Error creating PDF.")

    # Envía el PDF como respuesta para que el usuario pueda descargarlo
    return FileResponse(path=pdf_path, filename=pdf_path, media_type='application/pdf')


