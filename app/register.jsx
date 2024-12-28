import React, { useState } from 'react';
import { router, Link } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';
import Button from '../components/button';
import axios from "axios"
import {  
    Poppins_400Regular,
    Poppins_700Bold_Italic,
    Poppins_400Regular_Italic,
  } from "@expo-google-fonts/poppins";
  import { useFonts } from "expo-font";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMsg, setErrors] = useState({});
    const [form, setForm] = useState({});

    const RegisterSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(6, { message: "Must be 6 or more characters long" }),
    });

    const handleInputChange = (key, value) => {

        setForm({ ...form, [key]: value });
        console.log(form)
        try {
            RegisterSchema.pick({ [key]: true }).parse({ [key]: value });
            setErrors((prev) => ({ ...prev, [key]: "" }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
        }
    };

    // const handleRegister = () => {
    //     if (!username || !email || !password) {
    //         Alert.alert('Error', 'Please fill all the fields!');
    //     } else {
    //         // Logika register (misalnya validasi atau simpan data)
    //         Alert.alert('Success', 'Account created successfully!');
    //         navigation.navigate('Login'); // Arahkan ke halaman Login
    //     }
    // };

    const handleRegister = async () => {
        if (
            !username ||
            !form.email ||
            !form.password

        ) {
            Alert.alert(
                "Error",
                "All collumn must be filled"
            );
            return;
        }

        try {
            const response = await axios.post("https://janken-api-fix.vercel.app/api/users", {
                username: username,
                email: form.email,
                password: form.password,
            });

            Alert.alert("Success", "Registration success, Please login!");
            router.replace("/");
        } catch (error) {
            console.log(error)
            if (error.response) {
                Alert.alert(
                    "Failed",
                    `Registration failed: ${error.response.data.message}`
                );
            } else {
                Alert.alert("Failed", "Something went wrong. Please try again!");
            }
        }
    };

      const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold_Italic,
        Poppins_400Regular_Italic,
      });

    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>Register</Text>
            <View style={styles.form}> */}
            <Image
                source={require("../assets/janken_logo-red.png")}
                style={styles.logo}
                resizeMode="stretch"
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            ></Modal>
            <Text style={{ alignSelf: "align-start", color: "#CB1B45", fontFamily: "Poppins_400Regular" }}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#999"
            />
            <Text style={{ alignSelf: "align-start", color: "#CB1B45", fontFamily: "Poppins_400Regular" }}>Email</Text>
            <TextInput
                style={styles.input}
                value={form.email}
                keyboardType='email-address'
                onChangeText={(text) => handleInputChange("email", text)}
            />{" "}
            {errorMsg.email ? (
                <Text style={styles.errorMsg}>{errorMsg.email}</Text>
            ) : null}
            <Text style={{ alignSelf: "align-start", color: "#CB1B45", fontFamily: "Poppins_400Regular" }}>Password</Text>
            <TextInput
                style={styles.input}
                value={form.password}
                secureTextEntry
                onChangeText={(text) => handleInputChange("password", text)}
            />{" "}
            {errorMsg.password ? (
                <Text style={styles.errorMsg}>{errorMsg.password}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                {/* <Button onPress={handleRegister} text="Register" /> */}
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: "center", padding: 7, color: "#CB1B45", fontFamily: "Poppins_400Regular" }}>
                Have an account? {""}
            </Text>
            <Link href="/login" style={styles.rgs}>
                Click here!
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
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
        marginTop: -30,
        marginBottom: 70,
    },
    subLogo: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
        textAlign: 'left',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#CB1B45',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        width: '85%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        weight: 20,
    },
    rgs: {
        marginTop: -5,
        color: "#CB1B45",
        fontFamily: "Poppins_700Bold_Italic",
        textDecorationLine: "underline",
      },
      errorMsg: {
        color: "red",
        width: "100%",
        fontFamily: "Poppins_400Regular",
      },
});
