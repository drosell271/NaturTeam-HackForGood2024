import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Transition = ({ navigation }) => {
	const handleFind = () => {
		navigation.navigate("Map");
	};

	const handleReport = () => {
		navigation.navigate("Report");
	};

	const handleHistory = () => {
		navigation.navigate("Eventos");
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleFind}>
				<Text style={styles.buttonText}>Find</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={handleReport}>
				<Text style={styles.buttonText}>Report</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={handleHistory}>
				<Text style={styles.buttonText}>History</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#008000",
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
	},
	button: {
		width: "70%",
		height: 60,
		marginBottom: 20,
		borderRadius: 30,
		backgroundColor: "#333333",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#FEFAE0",
		fontWeight: "bold",
		fontSize: 24,
	},
});

export default Transition;
