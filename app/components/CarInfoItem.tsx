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
import { appConfig } from "../app.config";

interface ICarInfoItem {
  title: string;
  pidCode: string;
  warningValue?: number;
  customStyles?: StyleProp<ViewStyle>;
  scale?: number;
}

export const CarInfoItem = ({
  title,
  pidCode,
  warningValue,
  customStyles,
  scale = 1,
}: ICarInfoItem) => {
  const [value, setValue] = useState<number | null>(null);
  const [valueText, setValueText] = useState<string>("white");

  const handleLongPress = () => {
    console.log("options for this car info item");
  };

  useEffect(() => {
    const getValueFromCar = () => {
      const newValue = Number((Math.random() * 100).toFixed(2));
      setValue(newValue);

      if (!warningValue || newValue === null) {
        setValueText("white");
        return;
      }

      const lowerBound = warningValue * 0.8;
      const upperBound = warningValue;

      if (newValue >= upperBound) {
        setValueText(valuesColors.error);
      } else if (newValue >= lowerBound) {
        setValueText(valuesColors.warning);
      } else {
        setValueText(valuesColors.default);
      }
    };

    getValueFromCar();

    const interval = setInterval(() => {
      getValueFromCar();
    }, appConfig.valueTimeRefresh);

    return () => clearInterval(interval);
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
