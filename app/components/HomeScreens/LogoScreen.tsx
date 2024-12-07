import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

const LogoScreen = () => {
  return (
    <View style={[globalStyles.homeScreen, styles.container]}>
      <Image
        source={require("../../assets/mustang_logo.png")}
        style={styles.image}
      />
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

export default LogoScreen;
