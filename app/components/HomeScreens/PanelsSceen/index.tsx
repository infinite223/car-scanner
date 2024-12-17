import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles/globalStyles";
import BasePanel from "./BasePanel";
import LogoPanel from "./LogoPanel";
import SecendPanel from "./SecendPanel";

const PanelScreen = () => {
  return (
    <View style={[globalStyles.homeScreen, styles.container]}>
      <FlatList
        data={[<BasePanel />, <SecendPanel />, <LogoPanel />]}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        scrollEventThrottle={16}
        renderItem={({ item }) => item}
        showsHorizontalScrollIndicator={false}
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

export default PanelScreen;
