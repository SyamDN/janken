import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  onPress,
  TouchableOpacity,
  Image,
} from "react-native";
import Button from "../components/button";
import { z } from "zod";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = z.object({
  username: z.string().min(1, { message: "Invalid username" }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMsg, setErrors] = useState({});
  const [serverError, setServerError] = useState(" ");
  const router = useRouter();

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    console.log("Form data:", form); // Log form data
    try {
      LoginSchema.parse(form);
      console.log("Validation passed");

      const res = await axios.post(
        "https://janken-api-fix.vercel.app/api/auth/login",
        form
      );
      await AsyncStorage.setItem("token", res.data.data.token);
      console.log("Login successful, navigating to userPick");
      router.replace("/home");
    } catch (err) {
      console.error("Error during login:", err); // Log error
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Server responded with:", err.response.data); // Log detail dari respons server
          setServerError(err.response.data.message || "An error occurred");
        } else if (err.request) {
          setServerError("Network error. Please try again later.");
          console.error("Network Error:", err.request);
        } else {
          setServerError("An unexpected error occurred.");
          console.error("Request Setup Error:", err.message);
        }
      } else if (err?.errors) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
        });
        setErrors(errors);
      } else {
        setServerError("An unknown error occurred.");
        console.error("Unhandled Error:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {serverError && <Text>{serverError}</Text>}
      <Image
        source={require("../assets/janken_logo-red.png")}
        style={styles.logo}
        resizeMode="stretch"
      />
      <Text style={{ alignSelf: "align-start", color: "#CB1B45" }}>
        {" "}
        Username{" "}
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("username", text)}
      />

      {errorMsg.username ? (
        <Text style={styles.errorMsg}>{errorMsg.username}</Text>
      ) : null}

      <Text style={{ alignSelf: "align-start", color: "#CB1B45" }}>
        {" "}
        Password{" "}
      </Text>

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
      />

      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}

      <Button onPress={handleSubmit} text="Login" />
      <Text style={{ alignSelf: "center", padding: 7, color: "#CB1B45" }}>
        Don't have an account? {""}
      <Link href="/register" style={styles.rgs}>
        Click here!
      </Link>
      </Text>

      {/* <Link href="/win" style={styles.linkText}>
        Win page
      </Link>

      <Link href="/lose" style={styles.linkText}>
        Lose page
      </Link>

      <Link href="/draw" style={styles.linkText}>
        Draw page
      </Link>

      <Link href="/home" style={styles.linkText}>
        Home page
      </Link>

      <Link href="/userPick" style={styles.linkText}>
        User Pick
      </Link> */}
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    // width: 233,
    // height: 57,
    marginTop: -30,
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
  inputpw: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  rgs: {
    marginTop: -5,
    color: "#CB1B45",
    fontStyle: "italic", // Italic text
    fontWeight: "bold", // Bold text
    textDecorationLine: "underline",
  },

  blmrgs: {
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    width: "100%",
  },
});
