import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router"; // Gunakan useRouter untuk navigasi
import AsyncStorage from "@react-native-async-storage/async-storage";
import Poppins_700Bold from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";

const GameResultPopup = ({ isVisible, onPlayAgain, onBackToHome }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Image
            source={require("../assets/lose.png")} // Ganti dengan gambar lose
            style={styles.image}
          />

          {/* Buttons */}
          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={onPlayAgain}
          >
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backHomeButton}
            onPress={onBackToHome}
          >
            <Text style={styles.backHomeText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function App() {
  const [isModalVisible, setModalVisible] = useState(true);
  const router = useRouter(); // Inisialisasi router

  const handlePlayAgain = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        router.replace("/login");
        return;
      }

      router.replace("/userPick");
    } catch (error) {
      console.error("Error in play again:", error);
      router.replace("/login");
    }
  };

  const handleBackToHome = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        router.replace("/login");
        return;
      }

      router.replace("/home");
    } catch (error) {
      console.error("Error in back to home:", error);
      router.replace("/login");
    }
  };

      const [fontsLoaded] = useFonts({
        Poppins_700Bold,
      });

  return (
    <View style={styles.container}>
            <Image
              source={require("../assets/janken_logo-white.png")}
              style={styles.logo}
              resizeMode="stretch"
            />
      <GameResultPopup
        isVisible={isModalVisible}
        onPlayAgain={handlePlayAgain}
        onBackToHome={handleBackToHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#CB1B45",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  popupContainer: {
    width: 280,
    height: 260,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
  },
  image: {
    marginTop: 15,
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: -90,
    marginBottom: 350,
  },
  playAgainButton: {
    backgroundColor: "#CB1B45",
    padding: 10,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  playAgainText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
  backHomeButton: {
    backgroundColor: "#FFC408",
    padding: 10,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  backHomeText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
});