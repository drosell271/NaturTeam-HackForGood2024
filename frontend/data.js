import { default as Marker } from "./assets/marker.png";

export const MARKERS_DATA = [];

// Función para obtener los datos de la API
const fetchData = async () => {
	try {
		const response = await fetch(
			`http://192.168.69.33:8000/event/get/coordinates/token=436e2214-7`
		);
		if (!response.ok) {
			throw new Error("Respuesta de la red no fue ok");
		}
		console.log(response);
		const data = await response.json();

		// Procesar y agregar los nuevos datos a MARKERS_DATA
		data.forEach((item) => {
			MARKERS_DATA.push({
				id: item.id.toString(),
				latitude: item.latitude,
				longitude: item.longitude,
				img: Marker,
			});
		});
	} catch (error) {
		console.error("Hubo un problema con la petición Fetch:", error);
	}
};

// Llamar a la función para cargar los datos
fetchData();
