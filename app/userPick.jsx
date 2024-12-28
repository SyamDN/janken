import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import JankenChoices from '../components/JankenChoice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {  
  Poppins_400Regular,
  Poppins_700Bold_Italic,
  Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

export default function UserPick() {
  const [score, setScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState({
    username: 'Loading...',
    score: 0,
  });

  // Effect untuk mengambil data profil
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 1. Ambil token dari AsyncStorage
        const token = await AsyncStorage.getItem('token');

        // Coba ambil session_streak dari AsyncStorage
        const savedSessionStreak = await AsyncStorage.getItem('sessionStreak');

        if (savedSessionStreak) {
          setScore(parseInt(savedSessionStreak, 10));
        }

        if (!token) {
          console.error('No token found');
          return;
        }

        // 2. Kirim request ke endpoint profil
        const response = await axios.get(
          'https://janken-api-fix.vercel.app/api/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 3. Update state dengan data dari response
        setCurrentUser({
          username: response.data.data.username,
          score: response.data.data.win_streak || 0,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);

        // Handle error - set default values
        setCurrentUser({
          username: 'Guest',
          score: 0,
        });
      }
    };

    // Panggil fungsi fetch
    fetchUserProfile();
  }, []);
  // Fungsi untuk mendapatkan sumber gambar berdasarkan pilihan
  const getChoiceImage = (choice) => {
    switch (choice) {
      case 'rock':
        return (
          <Image
            source={require('../assets/RockPress.png')}
            style={{ width: 110, height: 110 }}
          />
        );
      case 'scissors':
        return (
          <Image
            source={require('../assets/ScissorPress.png')}
            style={{ width: 110, height: 110 }}
          />
        );
      case 'paper':
        return (
          <Image
            source={require('../assets/PaperPress.png')}
            style={{ width: 110, height: 110 }}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log('Computer Choice State:', computerChoice);
  }, [computerChoice]);

  const handleChoice = async (choice) => {
    const validChoices = ['rock', 'paper', 'scissors'];
    if (!validChoices.includes(choice)) {
      console.error('Invalid choice:', choice);
      return;
    }

    setPlayerChoice(choice);
    setIsLoading(true);

    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        // Redirect ke login atau tampilkan error
        return;
      }

      //delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 detik

      // Send the user's choice to the backend
      const response = await axios.post(
        'https://janken-api-fix.vercel.app/api/game-session/play',
        { userChoice: choice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Handle the response
      const gameResult = response.data.data;

      // Update dan simpan session_streak
      const newSessionStreak = gameResult.gameSession.session_streak;
      setScore(parseInt(newSessionStreak, 10));

      // Simpan ke AsyncStorage
      await AsyncStorage.setItem('sessionStreak', newSessionStreak.toString());

      setComputerChoice(gameResult.computerChoice);

      setIsLoading(false);

      // console.log('Result:', gameResult.result);
      // console.log('User Choice:', gameResult.userChoice);
      // console.log('Computer Choice:', gameResult.computerChoice);

      // Delay sebelum redirect untuk memastikan pilihan komputer ditampilkan
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay 2 detik
      // Navigate to the appropriate result screen based on the game result
      if (gameResult.result === 'win') {
        router.replace('/win');
      } else if (gameResult.result === 'lose') {
        router.replace('/lose');
      } else if (gameResult.result === 'draw') {
        router.replace('/draw');
      } else {
        console.error('Unexpected game result:', gameResult);
        router.replace('/home');
      }
    } catch (error) {
      setIsLoading(false); // Pastikan loading dihentikan jika ada error
      console.error('Error Playing Game:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  };

      const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold_Italic,
        Poppins_400Regular_Italic,
      });
    
  return (
    <View style={styles.container}>
      {/* Score Section */}
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreNumber}>{score}</Text>
          </View>
        </View>
        <Image
          source={require('../assets/janken_logo-white.png')}
          style={styles.logo}
        />
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        <View style={styles.gameProfile}>
          <Text style={styles.circleText}>You</Text>
          <View style={styles.circle}>
            {playerChoice && getChoiceImage(playerChoice)}
          </View>
        </View>

        <Text style={styles.vsText}>VS</Text>

        <View style={styles.gameProfile}>
          <Text style={styles.circleText}>Computer</Text>
          <View style={styles.circle}>
            {playerChoice ? (
              isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#CB1B45"
                  style={{
                    transform: [{ scale: 1.5 }], // Membuat loading indicator lebih besar
                  }}
                />
              ) : computerChoice ? (
                getChoiceImage(computerChoice)
              ) : null
            ) : null}
          </View>
        </View>
      </View>

      {/* Janken Choices */}
      <JankenChoices onChoiceSelect={handleChoice} disabled={isLoading} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CB1B45',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  logo: {
    width: 100, // Adjust logo width
    height: 100, // Adjust logo height
    justifyContent: 'flex-end',
    resizeMode: 'contain',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 15, // Add margin to separate from logo
  },
  scoreText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Poppins_400Regular",
  },

  scoreBox: {
    backgroundColor: '#FFF',
    width: 37,
    height: 37,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#CB1B45',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color : '#CB1B45'
  },
  gameArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  gameProfile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#FFF',
    width: 100,
    height: 99,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  circleText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  vsText: {
    color: '#FFF',
    fontSize: 46,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Poppins_400Regular",
  },
  choiceImage: {
    width: 70, // Sesuaikan dengan ukuran lingkaran
    height: 70,
    resizeMode: 'contain',
  },
});