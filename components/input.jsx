import { View, StyleSheet, TextInput, Text } from "react-native";

function Input({ text, value, setValue }) {
  return (
    <View style={style.container}>
      <Text style={style.placeholder}>{text}</Text>
      <TextInput
        style={style.input}
        value={value}
        onChangeText={(val) => setValue(val)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    bacgroundColor: "white",
    width: "100%",
    padding: 10,
  },

  placeholder: {
    color: " #B3b3b3",
  },

  input: {
    borderBottomColor: "#B3B3B3",
    borderBottomWitdh: 0.5,
  },
});

export default Input;
