import React, { useEffect, useState } from "react";
import { Button, Text, View, FlatList } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";
import { Buffer } from "buffer";

const BluetoothScanner2: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [manager, setManager] = useState<BleManager | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [rpm, setRpm] = useState<number | null>(null);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    const bleManager = new BleManager();
    setManager(bleManager);
    requestPermissions();

    return () => {
      bleManager.destroy();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if (Platform.Version >= 31) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      } else {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      }
    }
  };

  const startScan = () => {
    if (manager) {
      setIsScanning(true);

      manager.startDeviceScan(null, null, (error, device) => {
        console.log("log: 1");
        if (error) {
          console.error("Scan error:", error);
          setIsScanning(false);
          return;
        }
        if (device && device.name === "MustangData") {
          console.log("log: 2");
          stopScan();
          connectToDevice(device);
        }
      });
    }
  };

  const connectToDevice = async (device: Device) => {
    try {
      await device.connect();
      await device.discoverAllServicesAndCharacteristics();
      setConnectedDevice(device);
      startReadingData(device); // Rozpocznij odczyt danych po połączeniu
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const startReadingData = (device: Device) => {
    const speedInterval = setInterval(
      () => sendCommandToDevice(device, "0x1111"),
      1000
    ); // co 1 sekunda
    // const rpmInterval = setInterval(
    //   () => sendCommandToDevice(device, "010C"),
    //   1000
    // );

    return () => {
      clearInterval(speedInterval);
      // clearInterval(rpmInterval);
    };
  };

  const sendCommandToDevice = async (device: Device, command: string) => {
    try {
      // const serviceUUID = "00001111-0000-1000-8000-00805f9b34fb"; // Service UUID z LightBlue
      const characteristicUUID = "00002222-0000-1000-8000-00805f9b34fb"; // Characteristic UUID z LightBlue
      const serviceUUID = "00001111-0000-1000-8000-00805f9b34fb"; // Service UUID
      // const characteristicUUID = "44217A0A-6AF3-4404-AE38-6F52F326511E"; // Characteristic UUID
      const commandBase64 = Buffer.from(command + "\r").toString("base64");
      // console.log(commandBase64);
      // const characteristic =
      //   await device.writeCharacteristicWithResponseForService(
      //     serviceUUID,
      //     characteristicUUID,
      //     commandBase64
      //   );

      const characteristic = await device.readCharacteristicForService(
        serviceUUID,
        characteristicUUID
      );

      console.log(characteristic.value);
      const speedData = parseSpeed(characteristic.value!);
      setSpeed(speedData);

      if (command === "2222") {
        const speedData = parseSpeed(characteristic.value!);
        setSpeed(speedData);
      } else if (command === "010C") {
        const rpmData = parseRpm(characteristic.value!);
        setRpm(rpmData);
      }
    } catch (error) {
      console.error("Error sending command:", error);
    }
  };

  const parseSpeed = (response: string | undefined): number | null => {
    if (!response) return null;
    const decoded = Buffer.from(response, "base64").toString("hex");
    console.log(decoded, "decoded");

    return parseInt(decoded);
    // const speedHex = decoded.substring(4, 6); // prędkość w km/h
    // return parseInt(speedHex, 16);
  };

  const parseRpm = (response: string | undefined): number | null => {
    if (!response) return null;
    const decoded = Buffer.from(response, "base64").toString("hex");
    const rpmHex = decoded.substring(4, 8);
    return parseInt(rpmHex, 16) / 4; // obliczenia na podstawie specyfikacji OBD-II
  };

  const stopScan = () => {
    manager?.stopDeviceScan();
    setIsScanning(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <Button
        title={isScanning ? "Stop Scan" : "Start Scan"}
        onPress={isScanning ? stopScan : startScan}
      />

      {connectedDevice ? (
        <View style={{ padding: 10 }}>
          <Text>Connected to: {connectedDevice.name}</Text>
          <Text>Speed: {speed !== null ? `${speed} km/h` : "N/A"}</Text>
          <Text>RPM: {rpm !== null ? `${rpm} RPM` : "N/A"}</Text>
        </View>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>ID: {item.id}</Text>
              <Text>Name: {item.name || "Unknown"}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BluetoothScanner2;
