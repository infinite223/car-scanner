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
import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { appConfig } from "../appConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";

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

  const screenWidth = SCREEN_WIDTH - 150;

  const elementsPerRow = Math.ceil(6 / scale);
  const itemSize = screenWidth / elementsPerRow;

  return (
    <SafeAreaView style={[globalStyles.screenContainer, {}]}>
      <MainNavigation />

      <ScrollView>
        <View style={styles.header}>
          <Text style={[globalStyles.baseText, styles.headerText]}>
            Aktualne parametry silnika
          </Text>
          {/* <TouchableOpacity style={styles.button}>
              <Text style={[globalStyles.baseText, styles.buttonText]}>
                Oceń przez AI
              </Text>
            </TouchableOpacity> */}
          {appConfig.isConnectedWithautomotiveplace && (
            <TouchableOpacity style={styles.button}>
              <Text style={[globalStyles.baseText, styles.buttonText]}>
                Loguj parametry
              </Text>
              <FontAwesome name="play-circle" color="white" size={30} />
            </TouchableOpacity>
          )}
        </View>

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
  button: {
    borderColor: "#444",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
  },
});
