import { useNavigation, useRouter } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import { TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { appConfig } from "../appConfig";
import { AnimatedNumber } from "../components/AnimatedNumber";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LeftNavigation } from "../components/LeftNavigation";

const leftNavIconsColor = "#ccc";

export default function CarInfo() {
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

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

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <LeftNavigation />
        <ScrollView>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PinchGestureHandler onGestureEvent={handlePinch}>
              <View style={styles.paramsContainer}>
                {settings.carInfoItems.map((item, i) => (
                  <CarInfoItem
                    key={i}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paramsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "800",
  },
});
