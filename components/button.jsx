import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({
  bgColor = "#CB1B45",
  textColor = "F5F5F5",
  text,
  onPress = () => {},
}) {
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
    paddingVertical: 15,
    marginTop: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    shadowOffset: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Button;
