import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const MyButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.activeColor,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },

  text: {
    fontFamily: "open-sans-regular",
    fontSize: 18,
    color: "white",
  },
});

export default MyButton;
