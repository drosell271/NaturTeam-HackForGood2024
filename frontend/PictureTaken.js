import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

const PictureTaken = ({ route, navigation }) => {
	const { imageUri } = route.params;

	const handleDelete = () => {
		// Implementa la lógica para borrar la imagen aquí
		console.log("Imagen borrada");
		// Navega de regreso a la pantalla anterior
		navigation.navigate("Transition");
	};

	const handleNext = (uri) => {
		console.log(uri);
		navigation.navigate("Formulario");
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: imageUri }} style={styles.image} />
			<View style={styles.buttonContainer}>
				<Button color="green" title="Borrar" onPress={handleDelete} />
				<Button
					color="green"
					title="Siguiente"
					onPress={() => handleNext()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	image: {
		width: "100%",
		height: "80%",
		resizeMode: "contain",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginTop: 20,
	},
});

export default PictureTaken;
