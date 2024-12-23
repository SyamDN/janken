import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

const GameResultPopup = ({ isVisible, onPlayAgain, onBackToHome }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Image
            source={require("../assets/lose.png")}
            style={styles.image}
          />
          
          {/* Buttons */}
          <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backHomeButton} onPress={onBackToHome}>
            <Text style={styles.backHomeText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function App() {
  const [isModalVisible, setModalVisible] = useState(true);

  const handlePlayAgain = () => {
    setModalVisible(false);
    // Add logic to reset the game
  };

  const handleBackToHome = () => {
    setModalVisible(false);
    // Add logic to navigate to home
  };

  return (
    <View style={styles.container}>
      {/* Popup Component */}
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
    backgroundColor: '#f8d5d5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: 280,
    height: 260,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    marginTop: 15,
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  playAgainButton: {
    backgroundColor: '#CB1B45',
    padding: 10,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  playAgainText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backHomeButton: {
    backgroundColor: '#FFC408',
    padding: 10,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  backHomeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
