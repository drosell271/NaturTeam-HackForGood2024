import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const logo = require("./assets/logo.png")

const Home = ({ navigation }) => {
    const handleSignup = () => {
        navigation.navigate("Signup");
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.image} resizeMode='contain' />
                
            </View>
            <Text style={styles.title}>Nature Team</Text>
            <View style={styles.buttonsContainer}>
            
                <TouchableOpacity style={styles.buttonSU} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLI} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 10, // Ajustar el margen superior para dejar espacio
    },
    title: {
        color: '#008000',
        fontWeight: 'bold',
        fontFamily: 'Baskerville-Bold',
        fontSize: 50,
        marginBottom: 50,
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: 200, // Ajusta el tamaño de la imagen aquí
        height: 200, // Ajusta el tamaño de la imagen aquí
        borderRadius: 100, // La mitad del tamaño para hacerla redonda
    },
    buttonSU: {
        width: '70%',
        height: 60,
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#008000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLI: {
        width: '70%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#008000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#008000',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        fontSize: 20,
    },
});

export default Home;
