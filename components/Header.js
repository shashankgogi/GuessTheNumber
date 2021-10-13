import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import Constants from "../constants/Colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

const HeaderView = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default HeaderView;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Platform.OS === "ios" ? "white" : Constants.activeColor,
    padding: 20,
    height: 60,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderBottomColor: Platform.OS === "ios" ? "black" : Colors.activeColor,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    height: 30,
  },
});
