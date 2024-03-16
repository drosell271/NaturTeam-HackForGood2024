import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, StyleSheet } from 'react-native';
import GetLocation from 'react-native-get-location'

const Formulario = ({navigation}) => {
  const [texto, setTexto] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        setLocation(location);
        console.log(location.coords); // Imprime las coordenadas en la consola
        setLoading(false); // Establece loading a falso después de obtener la ubicación
      } catch (error) {
        // Captura cualquier error y maneja adecuadamente
        console.warn('Error obteniendo la ubicación:', error);
        setLoading(false); // Asegúrate de establecer loading a falso incluso en caso de error
      }
    };

    getLocation(); // Llama a la función getLocation para obtener la ubicación cuando el componente se monta

    // Limpia el efecto si el componente se desmonta o si se actualiza la ubicación
    return () => {
      // Aquí podrías limpiar algún recurso si es necesario
    };
  }, []); 

  const handleEnviar = () => {
    navigation.navigate("Transition");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ingrese el texto"
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
      />
      <TextInput
        placeholder="Tiempo estimado (minutos)"
        value={tiempoEstimado}
        onChangeText={setTiempoEstimado}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Formulario;
