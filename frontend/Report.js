import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation desde React Navigation

const ReportView = () => {
	const [capturedImage, setCapturedImage] = useState(null);
	const cameraRef = useRef(null);
	const navigation = useNavigation(); // Obtiene la navegación

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setCapturedImage(photo.uri);

			navigateToNextScreen(photo.uri); // Llama a la función para navegar a la siguiente pantalla y pasa la URI de la foto
		}
	};

	const navigateToNextScreen = (uri) => {
		console.log("URL:", uri);
		navigation.navigate("Image", { imageUri: uri }); // Navega a la siguiente pantalla y pasa la URI de la foto como parámetro
	};

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			if (status !== "granted") {
				alert(
					"Lo siento, necesitamos permisos de cámara para hacer esto funcionar!"
				);
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Camera
				style={styles.camera}
				ref={cameraRef}
				type={Camera.Constants.Type.back}
			>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.captureButton}
						onPress={takePicture}
					/>
				</View>
			</Camera>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	camera: {
		width: "80%",
		aspectRatio: 1,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 20,
		alignSelf: "center",
	},
	captureButton: {
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: "#fff",
	},
});

export default ReportView;
