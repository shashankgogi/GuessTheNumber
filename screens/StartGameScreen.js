import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

import HeaderView from "../components/Header";
import CardView from "../components/Card";
import TextInputView from "../components/Input";
import NumberView from "../components/NumberVew";
import MyButton from "../components/MyButton";

const StartGame = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isConfirmed, setConfirmed] = useState(false);
  const [buttonContainerWidth, setButtonContainerWidth] = useState(
    Dimensions.get("window").width * 0.7
  );

  useEffect(() => {
    const bottonContainerWidthHandler = () => {
      setButtonContainerWidth(Dimensions.get("window").width * 0.7);
    };

    Dimensions.addEventListener("change", bottonContainerWidthHandler);

    return () => {
      Dimensions.removeEventListener("change", bottonContainerWidthHandler);
    };
  });
  const handleEnteredValue = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHanlder = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      setConfirmed(false);
      Alert.alert("Alert", "A number has to a number between 0 - 99", [
        { text: "Okay", onPress: resetInputHandler, style: "default" },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedValue(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  const getButtonContainerStyle = () => {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      width: buttonContainerWidth,
      marginTop: 10,
    };
  };
  let confirmedOutput;
  if (isConfirmed) {
    confirmedOutput = (
      <CardView style={styles.chosenView}>
        <Text>Selected Number</Text>
        <NumberView>{selectedValue}</NumberView>
        <MyButton onPress={props.onStartGame.bind(this, selectedValue)}>
          Start Game
        </MyButton>
      </CardView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={200}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <HeaderView title="New game" />
            <Text style={styles.title}>Start New Game</Text>
            <CardView style={styles.inputContainer}>
              <Text style={styles.cardTitle}> Enter Tour Number</Text>
              <TextInputView
                style={styles.input}
                blurOnSubmit
                keyboardType="number-pad"
                maxLength={2}
                autoCorrect={false}
                autoCapitlization={false}
                onChangeText={handleEnteredValue}
                value={enteredValue}
              />
              <View style={getButtonContainerStyle()}>
                <Button title="Reset" onPress={resetInputHandler} color="red" />
                <Button
                  title="Confirm"
                  onPress={confirmInputHanlder}
                  color="green"
                />
              </View>
            </CardView>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    justifyContent: "flex-start",
    marginTop: 10,
    height: 35,
    padding: 10,
    fontFamily: "open-sans-bold",
  },

  inputContainer: {
    marginTop: 20,
    width: "80%",
    height: 150,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    height: 20,
    marginVertical: 10,
  },
  input: {
    width: "20%",
    textAlign: "center",
  },

  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 10,
  //   width: Dimensions.get("window").width * 0.7,
  //   marginTop: 10,
  // },

  chosenView: {
    height: 150,
    width: "50%",
    marginVertical: 30,
    alignItems: "center",
  },

  scrollView: {
    height: "100%",
  },
});

export default StartGame;
