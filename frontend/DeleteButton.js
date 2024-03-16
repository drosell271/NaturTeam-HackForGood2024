import React from 'react';
import { Button } from 'react-native';

const DeleteButton = ({ onPress }) => {
  return <Button title="Borrar" onPress={onPress} />;
};

export default DeleteButton;
