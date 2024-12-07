import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";

const BasePanel = () => {
  return (
    <View style={[globalStyles.homeScreen, styles.container]}>
      <Text style={globalStyles.baseText}>base</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 640,
    resizeMode: "contain",
  },
});

export default BasePanel;
