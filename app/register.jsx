import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Please fill all the fields!');
        } else {
            // Logika register (misalnya validasi atau simpan data)
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login'); // Arahkan ke halaman Login
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <View style={styles.form}>
                <Image
                    source={require("../assets/janken_logo-red.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 18,
        color: 'blue',
        position: 'absolute',
        top: 40,
        left: 20,
    },
    form: {
        width: '90%',
        maxWidth: 400,
        padding: 20,
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: 'blue',
        alignItems: 'center',
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'red',
    },
    subLogo: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#CB1B45',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Register;
