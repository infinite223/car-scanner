import { globalStyles } from "../../../styles/globalStyles";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getRandomNumber } from "../../../common/helpers";
import CustomGauge from "../../CustomGauge";
import CustomLineGauge from "../../CustomLineGauge";

const SecendPanel = () => {
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);

  useEffect(() => {
    const getSpeedValue = () => setSpeed(Math.floor(getRandomNumber(0, 280)));
    const getRpmValue = () => setRpm(Math.floor(getRandomNumber(0, 8000)));

    const interval = setInterval(() => {
      getSpeedValue();
      getRpmValue();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[globalStyles.homeScreen, styles.container]}>
      <CustomLineGauge
        value={speed}
        maxValue={280}
        step={40}
        label="km/h"
        size={2.5}
      />
      <CustomLineGauge
        value={rpm}
        maxValue={8000}
        step={1000}
        label="RPM"
        size={2.5}
        success={4000}
        warning={6000}
        error={6500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    gap: 150,
  },
});

export default SecendPanel;
