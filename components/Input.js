import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import Constants from "../constants/Colors";

const TextInputView = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

export default TextInputView;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
