import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../styles/globalStyles";

interface ICarInfoItem {
  title: string;
  pidCode: string;
  warningValue?: number;
}

export const CarInfoItem = ({ title, pidCode, warningValue }: ICarInfoItem) => {
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
        setValueText("red");
      } else if (newValue >= lowerBound) {
        setValueText("orange");
      } else {
        setValueText("white");
      }
    };

    getValueFromCar();

    const interval = setInterval(() => {
      getValueFromCar();
    }, 1000);

    return () => clearInterval(interval);
  }, [pidCode, warningValue]);

  return (
    <Pressable style={styles.container} onLongPress={handleLongPress}>
      <Text
        style={[globalStyles.baseText, styles.valueText, { color: valueText }]}
      >
        {value !== null ? value.toFixed(2) : "--"}
      </Text>
      <Text style={[globalStyles.baseText, styles.titleText]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 250,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
  },
  valueText: {
    fontSize: 60,
    fontWeight: "900",
  },
  titleText: {
    color: "white",
    fontSize: 30,
  },
});
