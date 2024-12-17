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
  success?: number;
  warning?: number;
  error?: number;
}

const CustomGauge: React.FC<CustomGaugeProps> = ({
  value,
  maxValue,
  step = 10,
  label = "",
  size = 1,
  success,
  warning,
  error,
}) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming((value / maxValue) * 100, { duration: 500 });
  }, [value]);

  const progressBarStyle = useAnimatedStyle(() => {
    // Określanie koloru w zależności od przekroczenia limitów
    let backgroundColor = "#959397"; // Domyślny kolor (czerwono-pomarańczowy)

    if (success !== undefined && value > success) {
      backgroundColor = "#55a500"; // Pomarańczowy (warning)
    }

    if (warning !== undefined && value > warning) {
      backgroundColor = "#ffa500"; // Pomarańczowy (warning)
    }
    if (error !== undefined && value > error) {
      backgroundColor = "#ff0000"; // Czerwony (error)
    }

    return {
      width: `${progress.value}%`,
      backgroundColor,
    };
  });

  const renderScale = () => {
    const scaleValues = [];
    for (let i = 0; i <= maxValue; i += step) {
      scaleValues.push(i);
    }

    return scaleValues.map((num, index) => (
      <View key={index} style={styles.labelContainer}>
        <Text style={[styles.scaleText, { fontSize: 10 * size }]}>{num}</Text>
      </View>
    ));
  };

  return (
    <View style={[styles.container, { width: "100%", paddingHorizontal: 50 }]}>
      {/* Pasek progresu */}
      <View style={[styles.barBackground, { height: 30 * size }]}>
        <Animated.View
          style={[
            styles.barForeground,
            progressBarStyle,
            { height: 30 * size },
          ]}
        />
      </View>

      {/* Labelki */}
      <View style={styles.scaleContainer}>{renderScale()}</View>

      {/* Wartość */}
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
  },
  barBackground: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 15,
    overflow: "hidden",
  },
  barForeground: {
    borderRadius: 15,
  },
  scaleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  labelContainer: {
    alignItems: "center",
  },
  scaleText: {
    color: "white",
  },
  valueText: {
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomGauge;
