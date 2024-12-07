import { useNavigation } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles, SCREEN_WIDTH } from "../styles/globalStyles";
import { CarInfoItem } from "../components/CarInfoItem";
import { settings } from "./settings";
import { ScrollView } from "react-native";
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function Settings() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [scale, setScale] = useState(1);

  const handlePinch = (event: any) => {
    const newScale = Math.max(0.5, Math.min(event.nativeEvent.scale, 3));
    setScale(newScale);
  };

  const screenWidth = SCREEN_WIDTH - 150;

  const elementsPerRow = Math.ceil(6 / scale);
  const itemSize = screenWidth / elementsPerRow;

  return (
    <SafeAreaView style={[globalStyles.screenContainer, {}]}>
      <MainNavigation />

      <ScrollView>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PinchGestureHandler onGestureEvent={handlePinch}>
            <View style={styles.paramsContainer}>
              {settings.carInfoItems.map((item) => (
                <CarInfoItem
                  title={item.title}
                  pidCode={item.pidCode}
                  warningValue={item.warningValue}
                  customStyles={{ width: itemSize, height: itemSize }}
                  scale={scale}
                />
              ))}
            </View>
          </PinchGestureHandler>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paramsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
