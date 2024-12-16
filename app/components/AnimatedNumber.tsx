import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

interface AnimatedNumberProps {
  value: number; // Docelowa wartość
  duration?: number; // Opcjonalny czas trwania animacji
  textStyle?: any; // Styl tekstu
}

export const AnimatedNumber = ({
  value,
  duration = 500,
  textStyle,
}: AnimatedNumberProps) => {
  const animatedValue = useSharedValue(0); // Wartość animowana

  React.useEffect(() => {
    // Animuj do nowej wartości
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration]);

  // Użyj `useDerivedValue`, aby uniknąć bezpośredniego odczytu w JSX
  const derivedValue = useDerivedValue(() => {
    return animatedValue.value.toFixed(2); // Konwersja na tekst
  });

  return (
    <Animated.Text style={[textStyle]}>
      {/* Odczytujemy bezpośrednio z `useDerivedValue` */}
      {derivedValue.value}
    </Animated.Text>
  );
};
