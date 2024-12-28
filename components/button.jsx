import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";
function Button({
  bgColor = "#CB1B45",
  textColor = "white",
  text,
  onPress = () => {},
}) {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...style.button, backgroundColor: bgColor }}
    >
      <Text style={{ ...style.buttonText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    paddingVertical: 19,
    marginTop: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    shadowOffset: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
  },
});

export default Button;
