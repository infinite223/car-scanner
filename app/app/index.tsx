import { useNavigation } from "expo-router";
import { ImageBackground, SafeAreaView, Text } from "react-native";
import { useEffect } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles } from "../styles/globalStyles";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={10}
    >
      <SafeAreaView
        style={[
          globalStyles.screenContainer,
          { backgroundColor: "transparent" },
        ]}
      >
        <MainNavigation />
        <Text style={globalStyles.baseText}>Home</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}
