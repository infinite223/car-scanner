import {
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../styles/globalStyles";
import { valuesColors } from "../common/data";
import { appConfig } from "../appConfig";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";

interface ICarInfoItem {
  title: string;
  pidCode: string;
  warningValue?: number;
  customStyles?: StyleProp<ViewStyle>;
  scale?: number;
  isLogging: boolean;
}

export const CarInfoItem = ({
  title,
  pidCode,
  warningValue,
  customStyles,
  scale = 1,
  isLogging = false,
}: ICarInfoItem) => {
  const [value, setValue] = useState<number | null>(null);
  const [valueText, setValueText] = useState<string>("white");

  const logValueToExcel = (timestamp: string, value: number | null) => {
    const filePath = `${FileSystem.documentDirectory}CarData.xlsx`;

    FileSystem.getInfoAsync(filePath).then(({ exists }) => {
      let workbook: XLSX.WorkBook;
      if (exists) {
        const fileContents = FileSystem.readAsStringAsync(filePath, {
          encoding: FileSystem.EncodingType.Base64,
        });
        workbook = XLSX.read(fileContents, { type: "base64" });
        console.log(workbook, "a");
      } else {
        workbook = XLSX.utils.book_new();
      }

      const worksheetName = "Car Data";
      let worksheet = workbook.Sheets[worksheetName];
      console.log(worksheet, "w");
      if (!worksheet) {
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
      }

      const data: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as any[][];

      const newRow: any[] = [timestamp, title, value];
      console.log(newRow, "row");
      data.push(newRow);

      const updatedWorksheet = XLSX.utils.aoa_to_sheet(data);

      workbook.Sheets[worksheetName] = updatedWorksheet;

      const updatedFileContents = XLSX.write(workbook, { type: "base64" });
      FileSystem.writeAsStringAsync(filePath, updatedFileContents, {
        encoding: FileSystem.EncodingType.Base64,
      });
    });
  };

  const handleLongPress = () => {
    console.log("options for this car info item");
  };

  useEffect(() => {
    const getValueFromCar = () => {
      const newValue = Number((Math.random() * 100).toFixed(2));
      setValue(newValue);

      if (!warningValue || newValue === null) {
        setValueText("white");
      } else {
        const lowerBound = warningValue * 0.8;
        const upperBound = warningValue;

        if (newValue >= upperBound) {
          setValueText(valuesColors.error);
        } else if (newValue >= lowerBound) {
          setValueText(valuesColors.warning);
        } else {
          setValueText(valuesColors.default);
        }
      }

      // Zapisz dane do Excela
      const timestamp = new Date().toISOString();

      if (isLogging) {
        logValueToExcel(timestamp, newValue);
      }
    };

    const timeout = setTimeout(() => {
      getValueFromCar();

      const interval = setInterval(() => {
        getValueFromCar();
      }, appConfig.valueTimeRefresh);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [pidCode, warningValue]);

  return (
    <Pressable
      style={[styles.container, customStyles]}
      onLongPress={handleLongPress}
    >
      <Text
        style={[
          globalStyles.baseText,
          styles.valueText,
          { color: valueText, fontSize: 40 * scale },
        ]}
      >
        {value !== null ? value.toFixed(2) : "--"}
      </Text>

      <Text
        style={[
          globalStyles.baseText,
          styles.titleText,
          { fontSize: 15 * scale },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
    minHeight: 250,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
  },
  valueText: {
    fontWeight: "900",
  },
  titleText: {
    color: "white",
  },
});
