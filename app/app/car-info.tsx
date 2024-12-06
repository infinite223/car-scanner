import { useNavigation } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles } from "../styles/globalStyles";
import { CarInfoItem } from "../components/CarInfoItem";
import { settings } from "./settings";
import { ScrollView } from "react-native";

export default function Settings() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={[globalStyles.screenContainer, {}]}>
      <MainNavigation />

      <ScrollView>
        <View style={styles.paramsContainer}>
          {settings.carInfoItems.map((item) => (
            <CarInfoItem
              title={item.title}
              pidCode={item.pidCode}
              warningValue={item.warningValue}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paramsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    padding: 20,
  },
});
