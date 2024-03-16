import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Event = ({ imageUrl, name, datetime, distance, atendeesCount, setShowEventDetail, setEventDetail, event }) => (
	<TouchableOpacity style={styles.item} onPress={(() => {
		setEventDetail(event);
		setShowEventDetail(true);
	})}>
		<Image
			style={styles.tinyLogo}
			source={(require("./default.jpg"))}
		/>
		<View style={styles.eventText}>
			<Text style={styles.title}>{name}</Text>
			<Text>{datetime}</Text>
			<Text>Distancia {distance.toFixed(2)} km</Text>
			<Text>{atendeesCount} voluntarios inscritos</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	item: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#87A922',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		color: '#87A922',
	},
	tinyLogo: {
		width: 100,
		aspectRatio: 1,
	},
	eventText: {
		marginStart: 15,
	},
});

export default Event;