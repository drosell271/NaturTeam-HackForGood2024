import React, { useState } from "react";
import {
	Alert,
	Button,
	Image,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	View,
} from "react-native";
const logo = require("./assets/logo.png");

export default function LoginForm(props) {
	const [click, setClick] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const authenticate = async () => {
		const url = "http://192.168.69.33:8000/login";
		const payload = {
			username,
			password,
		};
		console.log("Username", username);
		console.log("Payload:", payload, "URL:", url);
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
				alert(`Usuario o contraseña incorrectos.`);
				return;
			}

			props.navigation.navigate("Transition");
			const data = await response.json();
			setAccessToken(data.access_token); // Guarda el token en el estado del componente
			localStorage.setItem("accessToken", data.access_token); // También guarda el token en el almacenamiento local
			console.log("Logged in:", data.message);
		} catch (error) {
			console.error("Error al realizar la llamada API", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image source={logo} style={styles.image} resizeMode="contain" />
			<Text style={styles.title}>Login</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.input}
					placeholder="USERNAME"
					value={username}
					onChangeText={setUsername}
					autoCorrect={false}
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="PASSWORD"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					autoCorrect={false}
					autoCapitalize="none"
				/>
			</View>

			<View style={styles.buttonView}>
				<Pressable
					style={styles.button}
					onPress={() => {
						authenticate(username, password);
					}}
				>
					<Text style={styles.buttonText} onClick={authenticate}>
						LOGIN
					</Text>
				</Pressable>
			</View>

			<Text style={styles.footerText}>
				Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
			</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingTop: 70,
	},
	image: {
		height: 160,
		width: 170,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		textTransform: "uppercase",
		textAlign: "center",
		paddingVertical: 40,
		color: "green",
	},
	inputView: {
		gap: 15,
		width: "100%",
		paddingHorizontal: 40,
		marginBottom: 5,
	},
	input: {
		height: 50,
		paddingHorizontal: 20,
		borderColor: "green",
		borderWidth: 1,
		borderRadius: 7,
	},
	rememberView: {
		width: "100%",
		paddingHorizontal: 50,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 8,
	},
	switch: {
		flexDirection: "row",
		gap: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	rememberText: {
		fontSize: 13,
	},
	forgetText: {
		fontSize: 11,
		color: "green",
	},
	button: {
		backgroundColor: "green",
		height: 45,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	buttonView: {
		width: "100%",
		paddingHorizontal: 50,
	},
	optionsText: {
		textAlign: "center",
		paddingVertical: 10,
		color: "gray",
		fontSize: 13,
		marginBottom: 6,
	},
	mediaIcons: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 23,
	},
	icons: {
		width: 40,
		height: 40,
	},
	footerText: {
		textAlign: "center",
		color: "gray",
	},
	signup: {
		color: "green",
		fontSize: 13,
	},
});
