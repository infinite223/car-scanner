import { useNavigation } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import { LeftNavigation } from "../components/LeftNavigation";
import { readExcelFile } from "../common/helpers";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function CarInfo() {
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [scale, setScale] = useState(1);

  const handlePinch = (event: any) => {
    const newScale = Math.max(0.5, Math.min(event.nativeEvent.scale, 3));
    setScale(newScale);
  };

  const handleLogging = async () => {
    setIsLogging((state) => !state);

    if (isLogging) {
      const filePath = `${FileSystem.documentDirectory}CarData.xlsx`;

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        console.log("Plik Excel nie istnieje.");
        return;
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath);
      } else {
        console.log("Udostępnianie nie jest dostępne na tym urządzeniu.");
      }
    }
  };

  const screenWidth = SCREEN_WIDTH - 249;

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
        <LeftNavigation handleLogging={handleLogging} isLogging={isLogging} />
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
                    isLogging={isLogging}
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
