import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Event from './Event';

const EventList = ({ events, setShowEventDetail, setEventDetail }) => {
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={events}
				renderItem={({ item }) =>
					<Event
						imageUrl={item.image}
						name={item.name}
						datetime={item.created_at.substring(0, 19).replace('T', ' ')}
						distance={Math.random() * 100}
						atendeesCount={item.attendees_count}
						setShowEventDetail={setShowEventDetail}
						setEventDetail={setEventDetail}
						event={item}
					/>
				}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
});

export default EventList;