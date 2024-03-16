import React from 'react';
import { Button } from 'react-native';

const SaveButton = ({ onPress }) => {
  return <Button title="Guardar" onPress={onPress} />;
};

export default SaveButton;
