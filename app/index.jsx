import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const JankenScreen = () => {
  const navigation = useNavigation(); // Access navigation
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to full opacity
      duration: 700, // Duration in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      navigation.navigate("login", {
        animationTypeForReplace: "push", // Smooth slide in
      }); // Navigate to Login screen
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/janken_logo-white.png")} // Path to your PNG
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CB1B45",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.8, // Adjust size as needed
    height: height * 0.4,
    resizeMode: "contain", // or 'cover', 'stretch', etc.
  },
});

export default JankenScreen;
