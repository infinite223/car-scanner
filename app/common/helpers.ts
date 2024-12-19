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

export const logValueToExcel = async (
  timestamp: string,
  value: number | null
) => {
  try {
    const filePath = `${FileSystem.documentDirectory}CarData.xlsx`;

    const { exists } = await FileSystem.getInfoAsync(filePath);
    let workbook: XLSX.WorkBook;

    if (exists) {
      const fileContents = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      workbook = XLSX.read(fileContents, { type: "base64" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    const worksheetName = "Car Data";
    let worksheet = workbook.Sheets[worksheetName];

    if (!worksheet) {
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
    }

    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const newRow: any[] = [timestamp, value];
    data.push(newRow);

    const updatedWorksheet = XLSX.utils.aoa_to_sheet(data);
    workbook.Sheets[worksheetName] = updatedWorksheet;

    const updatedFileContents = XLSX.write(workbook, { type: "base64" });
    await FileSystem.writeAsStringAsync(filePath, updatedFileContents, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    console.error("Błąd podczas zapisywania do pliku Excel:", error);
  }
};

export const deleteExcelFile = async () => {
  try {
    const filePath = `${FileSystem.documentDirectory}CarData.xlsx`;

    const { exists } = await FileSystem.getInfoAsync(filePath);

    if (exists) {
      await FileSystem.deleteAsync(filePath);
      console.log("Plik został usunięty.");
    } else {
      console.log("Plik nie istnieje, nie ma czego usuwać.");
    }
  } catch (error) {
    console.error("Błąd podczas usuwania pliku:", error);
  }
};
