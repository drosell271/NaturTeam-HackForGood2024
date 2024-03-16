import React from 'react';
import { View, Image, Button } from 'react-native';

const OtherComponent = ({ imageUri }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    </View>
  );
};

export default OtherComponent;
