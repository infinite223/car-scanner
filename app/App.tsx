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

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          marginTop: 50,
          marginHorizontal: 20,
          backgroundColor: "#fc9322",
          padding: 10,
          width: 50,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={changeScreenOrientation}
      >
        <Text>O</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

AppRegistry.registerComponent("car-scanner", () => App);
