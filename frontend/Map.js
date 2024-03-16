import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { default as Marker_Image } from "./assets/marker.png";
import { saveToken } from "./login";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export function MapScreen() {
	const [markers, setMarkers] = useState([]); // Estado para los marcadores

	const getToken = async () => {
		try {
			const token = await AsyncStorage.getItem("accessToken");
			if (token === null) {
				console.log("No se encontró el token");
			} else {
				console.log("Token recuperado:", token);
				return token;
			}
		} catch (error) {
			console.error("Error al obtener el token:", error);
		}
	};

	// Función asíncrona para cargar los datos
	const loadMarkers = async () => {
		try {
			let token = getToken();
			if (token === null) {
				// Manejar la situación en la que el token no existe
				console.log("No se encontró el token");
				return;
			}

			const response = await fetch(
				`http://192.168.69.33:8000/event/get/coordinates/token=${token}`
			);

			if (!response.ok) {
				throw new Error("La respuesta de la API no es válida");
			}

			const data = await response.json();
			setMarkers(data); // Actualizar el estado con los nuevos marcadores
		} catch (error) {
			console.error("Error al actualizar los marcadores:", error);
		}
	};

	// Usar useEffect para cargar los marcadores al montar el componente
	useEffect(() => {
		loadMarkers();
	}, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

	return (
		<View style={styles.container}>
			<MapView
				customMapStyle={mapStyle}
				provider={PROVIDER_GOOGLE}
				style={styles.mapStyle}
				initialRegion={{
					latitude: 40.514717,
					longitude: -3.663806,
					latitudeDelta: 0.003,
					longitudeDelta: 0.003,
				}}
				mapType="standard"
			>
				{markers.map((marker) => (
					<Marker
						key={marker.id}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						image={Marker_Image} // Aquí utilizas la imagen personalizada para el marcador
					/>
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	mapStyle: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
