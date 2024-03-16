import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { MARKERS_DATA } from "./data";

export function MapScreen() {
	return (
		<View style={styles.container}>
			<MapView
				customMapStyle={mapStyle}
				provider={PROVIDER_GOOGLE}
				style={styles.mapStyle}
				initialRegion={{
					latitude: 41.3995345,
					longitude: 2.1909796,
					latitudeDelta: 0.003,
					longitudeDelta: 0.003,
				}}
				mapType="standard"
			>
				{MARKERS_DATA.map((marker) => (
					<Marker
						key={marker.id}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
					></Marker>
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
