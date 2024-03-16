import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

const Signup = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const register = async () => {
		const url = "http://192.168.69.33:8000/register";
		const payload = {
			username,
			password,
		};
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			console.log(response);
			if (!response.ok) {
				alert(`Algo salió mal. Inténtalo de nuevo.`);
				return;
			}

			navigation.navigate("Login");
		} catch (error) {
			console.error("Error al realizar la llamada API", error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Nature Team</Text>
			</View>

			<TextInput
				style={styles.input}
				placeholder="Nombre..."
				value={username}
				onChangeText={(text) => setUsername(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Contraseña..."
				value={password}
				onChangeText={(text) => setPassword(text)}
				secureTextEntry
			/>
			<TouchableOpacity style={styles.button} onPress={register}>
				<Text style={styles.buttonText}>Sign up</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#008000",
		justifyContent: "space-around",
		padding: 15,
	},
	header: {
		alignItems: "center",
	},
	headerText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontFamily: "Baskerville-Bold",
		fontSize: 40,
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		marginVertical: 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		fontSize: 20,
	},
	button: {
		width: "70%",
		height: 60,
		alignSelf: "center",
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

export default Signup;
