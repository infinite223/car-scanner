import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import OBD2Service from "../services/obd2Service";

const obd2 = new OBD2Service();

export const WifiScanner = () => {
  const [obdData, setObdData] = useState<string>("");

  const connectToOBD = async () => {
    try {
      await obd2.connectOBD2((data) => {
        setObdData((prev) => prev + "\n" + data);
      });
    } catch (error) {
      console.error("Błąd połączenia:", error);
    }
  };

  const sendRPMCommand = () => {
    obd2.sendCommand("010C");
  };

  return (
    <View
      style={{ flex: 1, padding: 20, justifyContent: "center", marginTop: 50 }}
    >
      <Button title="Połącz z OBD2" onPress={connectToOBD} />
      <Button title="Odczytaj RPM" onPress={sendRPMCommand} />
      <ScrollView>
        <Text style={{ marginTop: 20 }}>{obdData || "Brak danych"}</Text>
      </ScrollView>
    </View>
  );
};
