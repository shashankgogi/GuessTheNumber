import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardView = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
  },
});
export default CardView;
