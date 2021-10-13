import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

import NumberView from "../components/NumberVew";
import CardView from "../components/Card";
import HeaderView from "../components/Header";
import MyButton from "../components/MyButton";
import { Ionicons } from "@expo/vector-icons";
import { render } from "react-dom";

const generateRandomNum = (min, max, excludeValue) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === excludeValue) {
    return generateRandomNum(min, max, excludeValue);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength}</Text>
    <Text>{itemData.item}</Text>
  </View>
);
const GameScreen = (props) => {
  let initialGuess = generateRandomNum(1, 100, props.userChoise);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeigth, setAvailableDeviceHeigth] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === props.userChoise) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess]);

  useEffect(() => {
    const deviceDmentionHandler = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeigth(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", deviceDmentionHandler);
    return () => {
      Dimensions.removeEventListener("change", deviceDmentionHandler);
    };
  });
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoise) ||
      (direction === "greater" && currentGuess > props.userChoise)
    ) {
      Alert.alert("Don't lie", "You know the the currect number....", [
        { text: "Cancel", style: "cancel" },
      ]);

      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomNum(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuess) => [
      nextNumber.toString(),
      ...currentPastGuess,
    ]);
    // setRounds((currRounds) => currRounds + 1);
  };

  if (availableDeviceHeigth < 500) {
    return (
      <View style={styles.view}>
        <HeaderView title="Game Screen" />
        <Text style={styles.title}>Opponent Choise</Text>
        <View style={styles.landScapeview}>
          <MyButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" />
          </MyButton>
          <NumberView>{currentGuess}</NumberView>
          <MyButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" />
          </MyButton>
        </View>
        <View style={styles.listView}>
          {/* <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <HeaderView title="Game Screen" />
      <Text style={styles.title}>Opponent Choise</Text>
      <NumberView>{currentGuess}</NumberView>
      <CardView style={styles.viewContainer}>
        <MyButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" />
        </MyButton>
        <MyButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" />
        </MyButton>
      </CardView>
      <View style={styles.listView}>
        {/* <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  view: {
    alignItems: "center",
  },

  landScapeview: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 10,
  },

  viewContainer: {
    width: "80%",
    height: 60,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    marginVertical: 10,
    flexDirection: "row",
    padding: 10,
  },
  title: {
    fontSize: 20,
    height: 25,
    marginVertical: 10,
  },
  listView: {
    width: "80%",
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
export default GameScreen;
