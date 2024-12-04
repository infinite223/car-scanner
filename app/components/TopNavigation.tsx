import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";

export const TopNavigation = () => {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }

  return (
    <View style={styles.container}>
      <View></View>
      <TouchableOpacity style={styles.button} onPress={changeScreenOrientation}>
        <Text style={styles.buttonText}>r</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 20,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "red",
    width: 20,
    padding: 10,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
  },
});
