class JSON_Answer_Input(BaseModel):
	title: str
	isCorrect: bool

class JSON_Question_Input(BaseModel):
	title: str
	image: Optional[str]
	questionType: Literal['unica', 'multiple']
	allocatedTime: int
	weight: int
	answers: List[JSON_Answer_Input]

class JSON_Test_Input(BaseModel):
	title: str
	image: Optional[str]
	questions: List[JSON_Question_Input]

class Test(Base):
	__tablename__ = 'test'
	id = Column(Integer, primary_key=True, autoincrement=True)  
	title = Column(String, nullable=False)
	image = Column(String)
	archived = Column(Boolean, default=False)
	createdAt = Column(DateTime)
	updatedAt = Column(DateTime)
	questions = relationship("Question", backref="test", cascade="all, delete-orphan")
	games = relationship("Game", backref="test", cascade="all, delete-orphan")

@app.put("/test/create/token={token}")
async def create_test(token: str, input_data: JSON_Test_Input):
	await is_admin(token)
	try:
		for question in input_data.questions:
			correct_answer = len([answer for answer in question.answers if answer.isCorrect])
			if  correct_answer == 0:
				raise HTTPException(status_code=500, detail="Debe haber al menos una respuesta correcta")
			elif correct_answer > 1 and question.questionType == "unica":
				raise HTTPException(status_code=500, detail="Solo puede haber una respuesta correcta")
			elif (correct_answer < 2 or len(question.answers) < 3) and question.questionType == "multiple":
				raise HTTPException(status_code=500, detail="Debe haber al menos dos respuestas correctas y tres preguntas para un test de selección múltiple")

			existing_test = session.query(Test).filter(Test.title == input_data.title).first()

			if existing_test is not None:
				raise HTTPException(status_code=400, detail="Ya existe un test con este título")
			
		new_test = Test(
			title=input_data.title,
			image=input_data.image,
			createdAt=datetime.now(),
			updatedAt=datetime.now()
		)
		session.add(new_test)
		session.flush()
		
		if not input_data.questions:
			raise HTTPException(status_code=400, detail="No hay preguntas para guardar")

		index = 1
		for question_data in input_data.questions:

			if not question_data.answers:
				raise HTTPException(status_code=400, detail="No hay respuestas para guardar")

			new_question = Question(
				test_id=new_test.id,
				title=question_data.title,
				image=question_data.image,
				questionType=question_data.questionType,
				allocatedTime=question_data.allocatedTime,
				weight=question_data.weight
			)
			session.add(new_question)
			session.flush()

			for answer_data in question_data.answers:
				new_answer = Answer(
					question_id=new_question.id,
					title=answer_data.title,
					isCorrect=answer_data.isCorrect
				)
				session.add(new_answer)
			index += 1
		session.commit()
		return {"detail": "Test creado correctamente con ID: {}".format(new_test.id)}
	except HTTPException as e:
		raise e
	except Exception as e:
		session.rollback()
		raise HTTPException(status_code=500, detail=f"Error al editar el test: {str(e)}")
	finally:
		session.close()