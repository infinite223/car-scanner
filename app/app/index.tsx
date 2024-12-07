import { useNavigation } from "expo-router";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles } from "../styles/globalStyles";
import BaseScreen from "../components/HomeScreens/BaseScreen";
import PanelScreen from "../components/HomeScreens/PanelsSceen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const translateX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);

    Animated.timing(translateX, {
      toValue: index === 1 ? -150 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <GestureHandlerRootView style={[globalStyles.screenContainer, {}]}>
      <SafeAreaView
        style={[
          globalStyles.screenContainer,
          { backgroundColor: "transparent" },
        ]}
      >
        <Animated.View
          style={[styles.mainNavigation, { transform: [{ translateX }] }]}
        >
          <MainNavigation />
        </Animated.View>

        <FlatList
          data={[<BaseScreen />, <PanelScreen />]}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => item}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  mainNavigation: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 180,
    zIndex: 1,
    paddingVertical: 25,
  },
});

{
  /* <ImageBackground
source={require("../assets/bg.png")}
style={{ flex: 1 }}
resizeMode="cover"
blurRadius={10}
>
</ImageBackground> */
}
