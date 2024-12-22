import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.5; // Adjust the radius based on screen width
const BUTTON_SIZE = 110; // Size of the choice buttons
const BUTTON_RADIUS = BUTTON_SIZE / 2;

export default function JankenChoices() {
  return (
    <View style={styles.container}>
      {/* Replace the arc with an SVG */}
      <Svg
        style={styles.arc}
        viewBox="0 0 400 400" // Adjust the viewBox dimensions as per your SVG
        preserveAspectRatio="xMidYMid meet"
      >
        <Path
          d="M-68.5269 115.255C80.9872 -34.2592 323.398 -34.2593 472.912 115.255L554.849 197.192L202.192 549.849L-150.464 197.192L-68.5269 115.255Z" // Example SVG path
          fill="#5d2835"
          stroke="#efbac7"
          strokeWidth={5}
        />
      </Svg>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Choose Your{'\n'}Janken</Text>
        <View style={styles.choices}>
          {/* Rock (Left) */}
          <TouchableOpacity style={[styles.choiceButton, styles.rock]}>
            <Text style={styles.choiceText}>✊</Text>
          </TouchableOpacity>

          {/* Scissors (Top) */}
          <TouchableOpacity style={[styles.choiceButton, styles.scissors]}>
            <Text style={styles.choiceText}>✌️</Text>
          </TouchableOpacity>

          {/* Paper (Right) */}
          <TouchableOpacity style={[styles.choiceButton, styles.paper]}>
            <Text style={styles.choiceText}>✋</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Allow absolute-positioned elements to anchor here
    height: CIRCLE_RADIUS, // Adjust height to fit content
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  arc: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    position: 'absolute',
    bottom: -CIRCLE_RADIUS * 0.8, // Adjust based on reduced container height
    zIndex: 0,
  },
  title: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
    top: CIRCLE_RADIUS * 0.7, // Adjust position
    width: '100%',
    zIndex: 1,
  },
  choices: {
    width: '100%',
    height: '100%',
    position: 'relative', // Anchor absolute-positioned buttons here
    zIndex: 2,
  },
  choiceButton: {
    position: 'absolute',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 3,
    zIndex: 3,
  },
  rock: {
    borderColor: '#FFCC00',
    left: '5%', // Use percentages for relative positioning
    top: '40%',
  },
  scissors: {
    borderColor: '#00CCCC',
    top: '1%',
    left: '50%',
    transform: [{ translateX: -BUTTON_RADIUS }], // Center horizontally
  },
  paper: {
    borderColor: '#FF3366',
    right: '5%', // Use percentages
    top: '40%',
  },
  choiceText: {
    fontSize: 30,
  },
});
