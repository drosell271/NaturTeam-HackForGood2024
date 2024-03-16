import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Button, Alert } from 'react-native';

const Event = ({ imageUrl, name, datetime, estimatedTime, distance, atendeesCount, description }) => (
	<View style={styles.item}>
		<Image
			style={styles.tinyLogo}
			source={(require("./default.jpg"))}
		/>
		<View style={styles.eventText}>
			<Text style={styles.title}>{name.toUpperCase()}</Text>
			<Text>{datetime}</Text>
			<Text>Tiempo estimado: {estimatedTime}h</Text>
			<Text>Distancia {distance.toFixed(2)} km</Text>
			<Text>{atendeesCount} voluntarios inscritos</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
		<Button
			style={styles.btn}
			onPress={() => Alert.alert('')}
			title="Inscribirse"
			color="#87A922"
			accessibilityLabel="Learn more about this purple button"
		/>
	</View>
);

const styles = StyleSheet.create({
	item: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#87A922',
		padding: 20,
		marginTop: StatusBar.currentHeight || 0,
		marginBottom: 16,
		marginHorizontal: 16,
		flex: 1,
	},
	title: {
		padding: 10,
		fontSize: 25,
		color: '#87A922',
		alignSelf: 'center',
	},
	tinyLogo: {
		width: '100%',
		height: 400,
	},
	description: {
		paddingVertical: 10,
		textAlign: 'justify',
	},
});

export default Event;