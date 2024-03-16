import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Signup = ({ navigation }) => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {

        navigation.navigate("Transition");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Nature Team</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nombre..."
                value={nombre}
                onChangeText={(text) => setNombre(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellidos..."
                value={apellidos}
                onChangeText={(text) => setApellidos(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de teléfono..."
                value={telefono}
                onChangeText={(text) => setTelefono(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email..."
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña..."
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008000',
        justifyContent: 'space-around',
        padding: 15
    },
    header: {
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Baskerville-Bold',
        fontSize: 40,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        fontSize: 20,
    },
    button: {
        width: '70%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FEFAE0',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default Signup;
