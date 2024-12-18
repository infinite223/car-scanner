import { PermissionsAndroid, Platform } from "react-native";

export const requestPermissions = async () => {
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

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";

export const readExcelFile = async () => {
  try {
    const filePath = `${FileSystem.documentDirectory}CarData.xlsx`;

    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (!fileInfo.exists) {
      console.log("Plik nie istnieje.");
      return;
    }

    const fileContents = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const workbook = XLSX.read(fileContents, { type: "base64" });

    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log("Dane z Excela:", data);
    return data;
  } catch (error) {
    console.error("Błąd podczas odczytu pliku Excela:", error);
  }
};
