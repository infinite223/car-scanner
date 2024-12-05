import { Stack, useNavigation } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { useEffect } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles } from "../styles/globalStyles";

export default function Settings() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={[globalStyles.screenContainer, {}]}>
      <MainNavigation />
      <Text style={globalStyles.baseText}>Settings</Text>
    </SafeAreaView>
  );
}
