import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "expo-router";
import Entypo from "react-native-vector-icons/Entypo";

const Incompatibility = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={[globalStyles.screenContainer, styles.container]}>
      <Entypo name="tablet-mobile-combo" color="white" size={80} />

      <Text style={[globalStyles.baseText, styles.headerText]}>
        Twoje urządzenie nie jest kompatybilne z tą aplikacją
      </Text>

      <Text style={[globalStyles.baseText, styles.infoText]}>
        Aby korzystać z aplikacji musisz posiadać urządzenie z większą
        szerokością ekranu
      </Text>

      <Text style={[globalStyles.baseText, styles.appLogo]}>AM Panel</Text>
    </SafeAreaView>
  );
};

export default Incompatibility;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    padding: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 18,
    opacity: 0.8,
    textAlign: "center",
  },
  appLogo: {
    position: "absolute",
    bottom: 10,
    // textTransform: "uppercase",
  },
});
