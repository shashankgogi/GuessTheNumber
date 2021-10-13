import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchAllFonts = () => {
  return Font.loadAsync({
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchAllFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }
  const onRestartGameHandler = () => {
    setNumberOfRounds(0);
    setUserNumber(null);
  };
  const gameOverHandler = (noOfRounds) => {
    setNumberOfRounds(noOfRounds);
  };

  const userNumberHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setNumberOfRounds(0);
  };

  let currentScreen = <StartGameScreen onStartGame={userNumberHandler} />;
  // currentScreen = (
  //   <GameOverScreen rounds={1} onRestartGame={onRestartGameHandler} />
  // );
  if (userNumber && numberOfRounds <= 0) {
    currentScreen = (
      <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (numberOfRounds > 0) {
    currentScreen = (
      <GameOverScreen
        rounds={numberOfRounds}
        onRestartGame={onRestartGameHandler}
      />
    );
  }
  return <View>{currentScreen}</View>;
}

const styles = StyleSheet.create({});
