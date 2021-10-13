import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import HeaderView from "../components/Header";
import MyButton from "../components/MyButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <HeaderView title="End game" />
      <Text style={styles.text}>Game is over: </Text>
      <Image
        style={styles.image}
        // source={require("../assets/original.png")}
        source={{
          uri:
            "https://i0.wp.com/northmantrader.com/wp-content/uploads/2019/06/Game-over-2.png?ssl=1",
        }}
        resizeMode="cover"
      />
      <Text style={styles.text}>No of rounds: {props.rounds}</Text>
      <View style={styles.button}>
        <MyButton color="red" onPress={props.onRestartGame}>
          Restart
        </MyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    marginVertical: 10,
    height: 20,
  },

  button: {
    height: 80,
    padding: 10,
  },

  image: {
    height: 300,
    width: 300,
    marginVertical: 10,
  },
});

export default GameOverScreen;
