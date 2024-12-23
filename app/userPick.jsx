import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import JankenChoices from '../components/JankenChoice';

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
          source={require('../assets/janken_logo-white.png')}
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
              <Text style={styles.placeholder}>?</Text>
            )}
          </View>
        </View>

        <Text style={styles.vsText}>VS</Text>

        <View style={styles.gameProfile}>
          <Text style={styles.circleText}>Computer</Text>
          <View style={styles.circle}></View>
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
    height: 100,
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
  },
  vsText: {
    color: '#FFF',
    fontSize: 46,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
