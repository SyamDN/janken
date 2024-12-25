import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import JankenChoices from "../components/JankenChoice";

export default function userPick() {
  const [score, setScore] = useState(0);
  // State to store the player's choice
  const [playerChoice, setPlayerChoice] = useState(null);

  // Callback function to handle player's choice
  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  };

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
          source={require("../assets/janken_logo-white.png")}
          style={styles.logo}
        />
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        <View style={styles.gameProfile}>
          <Text style={styles.circleText}>You</Text>
          <View style={styles.circle}>
            {playerChoice ? (
              <>
                <Text style={styles.choiceIcon}>{playerChoice.icon}</Text>
                <Text style={styles.choiceLabel}>{playerChoice.label}</Text>
              </>
            ) : (
              <Text style={styles.placeholder}>?</Text> //belum dicommit sama syam
            )}
          </View>
        </View>

        <Text style={styles.vsText}>VS</Text>

        <View style={styles.gameProfile}>
          <Text style={styles.circleText}>Computer</Text>
          <View style={styles.circle}></View> //tinggal dari komputer
        </View>
      </View>

      {/* Janken Choices */}
      <JankenChoices onChoiceSelect={handleChoice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CB1B45",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  logo: {
    width: 100, // Adjust logo width
    height: 100, // Adjust logo height
    justifyContent: "flex-end",
    resizeMode: "contain",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 15, // Add margin to separate from logo
  },
  scoreText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  scoreBox: {
    backgroundColor: "#FFF",
    width: 37,
    height: 37,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#CB1B45",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  gameArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  gameProfile: {
    flexDirection: "column",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#FFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  circleText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  vsText: {
    color: "#FFF",
    fontSize: 46,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const App = () => {
//   const [playerChoice, setPlayerChoice] = useState('');
//   const [computerChoice, setComputerChoice] = useState('');
//   const [result, setResult] = useState('');

//   // Pilihan komputer secara acak
//   const getComputerChoice = () => {
//     const choices = ['Gunting', 'Batu', 'Kertas'];
//     const randomIndex = Math.floor(Math.random() * choices.length);
//     return choices[randomIndex];
//   };

//   // Menentukan pemenang
//   const determineWinner = (player, computer) => {
//     if (player === computer) {
//       return 'Seri!';
//     } else if (
//       (player === 'Gunting' && computer === 'Kertas') ||
//       (player === 'Kertas' && computer === 'Batu') ||
//       (player === 'Batu' && computer === 'Gunting')
//     ) {
//       return 'Kamu Menang!';
//     } else {
//       return 'Komputer Menang!';
//     }
//   };

//   // Fungsi untuk memulai game
//   const playGame = (choice) => {
//     const computer = getComputerChoice();
//     const gameResult = determineWinner(choice, computer);

//     setPlayerChoice(choice);
//     setComputerChoice(computer);
//     setResult(gameResult);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Gunting, Batu, Kertas</Text>

//       {/* Tombol Pilihan */}
//       <View style={styles.choicesContainer}>
//         <Button title="Gunting" onPress={() => playGame('Gunting')} />
//         <Button title="Batu" onPress={() => playGame('Batu')} />
//         <Button title="Kertas" onPress={() => playGame('Kertas')} />
//       </View>

//       {/* Hasil */}
//       <Text style={styles.resultText}>Pilihan Kamu: {playerChoice}</Text>
//       <Text style={styles.resultText}>Pilihan Komputer: {computerChoice}</Text>
//       <Text style={styles.resultText}>Hasil: {result}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   choicesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//     width: '80%',
//   },
//   resultText: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
// });

// export default App;
