import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NumberView = (props) => {
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderColor: "red",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
  },
});
export default NumberView;
