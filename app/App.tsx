// import "react-native-gesture-handler";
// import "react-native-reanimated";
import React, { useEffect } from "react";
import {
  AppRegistry,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import BluetoothScanner from "./components/BluetoothScanner";
import ModelComponent from "./components/Model";
import { getProjectDataById } from "./services/project";
import * as ScreenOrientation from "expo-screen-orientation";
import tw from "twrnc";
import { TopNavigation } from "./components/TopNavigation";

export default function App() {
  useEffect(() => {
    console.log("log");
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        console.log("New orientation:", event.orientationInfo.orientation);
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <TopNavigation />
    </SafeAreaView>
  );
}

AppRegistry.registerComponent("car-scanner", () => App);
