// App.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import BluetoothScanner from "./components/BluetoothScanner";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BluetoothScanner />
    </SafeAreaView>
  );
}
