import React from 'react';
import EventList from './EventList';
import EventDetail from './EventDetail';

const DATA = [
	{
		id: 2,
		name: "Nombre del evento",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare auctor purus commodo gravida. Curabitur ac enim et lacus bibendum.",
		image: "./imagejpg.jpg",
		estimated: 3,
		latitude: 40.712776,
		longitude: -74.005974,
		creator_id: 1,
		created_at: "2024-03-16T02:48:17.836170",
		cleaning_at: null,
		finished: false,
		attendees_count: 0
	},
	{
		id: 3,
		name: "Nombre del evento",
		description: "Descripción del evento",
		image: "./imagejpg.jpg",
		estimated: 3,
		latitude: 40.712776,
		longitude: -74.005974,
		creator_id: 1,
		created_at: "2024-03-16T02:48:17.836170",
		cleaning_at: null,
		finished: false,
		attendees_count: 0
	},
	{
		id: 4,
		name: "Nombre del evento",
		description: "Descripción del evento",
		image: "./imagejpg.jpg",
		estimated: 3,
		latitude: 40.712776,
		longitude: -74.005974,
		creator_id: 1,
		created_at: "2024-03-16T11:03:16.786615",
		cleaning_at: null,
		finished: false,
		attendees_count: 0
	}
];

const App = () => {
	const [showEventDetail, setShowEventDetail] = React.useState(false);
	const [events, setEvents] = React.useState(DATA);
	const [eventDetail, setEventDetail] = React.useState(DATA[0]);

	if (showEventDetail) {
		return (
			< EventDetail
				imageUrl={eventDetail.image}
				name={eventDetail.name}
				datetime={eventDetail.created_at.substring(0, 19).replace('T', ' ')}
				estimatedTime={eventDetail.estimated}
				distance={Math.random() * 40}
				atendeesCount={eventDetail.attendees_count}
				description={eventDetail.description}
			/>
		);
	}
	return (
		<EventList events={events} setShowEventDetail={setShowEventDetail} setEventDetail={setEventDetail}/>
	);
};

// civil cycle -> ciudadano ejemplar (participación ciudadana)
// admin
// entidades de ayuda
// Universidad de alcala de henares
// denuncia positiva

export default App;