import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, FlatList } from "react-native";

const logo = require("./assets/logo.png");

const DATA = [
	{
		id: 2,
		name: "Nombre del evento",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare auctor purus commodo gravida. Curabitur ac enim et lacus bibendum.",
		image: logo, // Ruta de la imagen corregida
		estimated: 3,
		latitude: 40.712776,
		longitude: -74.005974,
		creator_id: 1,
		created_at: "2024-03-16T02:48:17.836170",
		cleaning_at: null,
		finished: false,
		attendees_count: 0,
	},
	{
		id: 3,
		name: "Nombre del evento",
		description: "Descripción del evento",
		image: logo, // Ruta de la imagen corregida
		estimated: 3,
		latitude: 40.712776,
		longitude: -74.005974,
		creator_id: 1,
		created_at: "2024-03-16T02:48:17.836170",
		cleaning_at: null,
		finished: false,
		attendees_count: 0,
	},
	{
		id: 4,
		name: "Nombre del evento",
		description: "Descripción del evento",
		image: logo, // Ruta de la imagen corregida
		estimated: 3,
		latitude: 40.712776,
		longitude: -74.005974,
		creator_id: 1,
		created_at: "2024-03-16T11:03:16.786615",
		cleaning_at: null,
		finished: false,
		attendees_count: 0,
	},
];

const EventList = ({ setShowEventDetail, setEventDetail }) => {
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={({ item }) => (
					<Event
						imageUrl={item.image}
						name={item.name}
						datetime={item.created_at
							.substring(0, 19)
							.replace("T", " ")}
						distance={Math.random() * 100}
						atendeesCount={item.attendees_count}
						setShowEventDetail={setShowEventDetail}
						setEventDetail={setEventDetail}
						event={item}
					/>
				)}
				keyExtractor={(item) => item.id.toString()} // Convertir el id a string
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
});

export default EventList;
