import { Dimensions, StyleSheet } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
  },
  baseText: {
    color: "white",
  },
  homeScreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderRightWidth: 1,
    borderColor: "gray",
  },
});
