import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface CustomGaugeProps {
  value: number;
  maxValue: number;
  step?: number;
  label?: string;
  size?: number;
}

const CustomGauge: React.FC<CustomGaugeProps> = ({
  value,
  maxValue,
  step = 10,
  label = "",
  size = 1,
}) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming((value / maxValue) * 100, { duration: 500 });
  }, [value]);

  const needleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: 35 * size },
      { rotate: `-150deg` },
      { rotate: `${(progress.value / 100) * 180}deg` },
      { translateY: -35 * size },
    ],
  }));

  const renderScale = () => {
    const scaleValues = [];
    for (let i = 0; i <= maxValue; i += step) {
      scaleValues.push(i);
    }

    return scaleValues.map((num, index) => (
      <View
        key={index}
        style={[
          styles.scaleMark,
          {
            transform: [
              {
                rotate: `${-150 + (index / (scaleValues.length - 1)) * 180}deg`,
              },
              { translateY: -70 * size },
            ],
          },
        ]}
      >
        <Text style={[styles.scaleText, { fontSize: 6 * size }]}>{num}</Text>
      </View>
    ));
  };

  return (
    <View style={{ alignItems: "center", gap: 20 }}>
      <View
        style={[
          styles.container,
          {
            width: 150 * size,
            height: 150 * size,
            borderRadius: (150 * size) / 2,
          },
        ]}
      >
        {/* Skala */}
        {renderScale()}

        {/* Wskazówka */}
        <Animated.View
          style={[
            styles.needle,
            needleStyle,
            { width: 3 * size, height: 70 * size, bottom: (150 * size) / 2 },
          ]}
        />
      </View>

      <Text style={[styles.valueText, { fontSize: 15 * size }]}>
        {value} {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "#899",
    backgroundColor: "black",
  },
  needle: {
    position: "absolute",
    backgroundColor: "#ff6347",
  },
  valueText: {
    color: "white",
  },
  scaleMark: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scaleText: {
    color: "white",
  },
});

export default CustomGauge;
