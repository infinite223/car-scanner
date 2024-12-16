import { Stack, useNavigation } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { useEffect } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles } from "../styles/globalStyles";

export const settings = {
  carInfoItems: [
    {
      title: "Prędkość",
      pidCode: "0x0D",
      warningValue: 50,
    },
    {
      title: "Obroty silnika",
      pidCode: "0x0C",
      warningValue: 6400,
    },
    {
      title: "Temperatura oleju",
      pidCode: "0x5C",
      warningValue: 140,
    },
    {
      title: "Temperatura silnika",
      pidCode: "0x05",
    },
    {
      title: "Temperatura w dolocie",
      pidCode: "0x0F",
    },
    {
      title: "Ciśnienie w kolektorze dolotowym",
      pidCode: "0x0B",
    },
    {
      title: "Poziom paliwa",
      pidCode: "0x2F",
    },
    {
      title: "Obciążenie silnika",
      pidCode: "0x04",
    },
    {
      title: "Ciśnienie paliwa",
      pidCode: "0x0A",
    },
    {
      title: "Przepływomierz powietrza (MAF)",
      pidCode: "0x10",
    },
    {
      title: "Napięcie akumulatora",
      pidCode: "0x42",
    },
    {
      title: "Czas wtrysku paliwa",
      pidCode: "0x3C",
    },
    {
      title: "Poziom emisji CO2",
      pidCode: "0x48",
      warningValue: 30,
    },
    {
      title: "Prąd alternatora",
      pidCode: "0x49",
    },
    {
      title: "Stan czujnika lambda",
      pidCode: "0x14",
      warningValue: 10,
    },
    {
      title: "Średnie spalanie",
      pidCode: "0x5E",
    },
    {
      title: "Dystans od ostatniego resetu",
      pidCode: "0x31",
    },
    {
      title: "Prędkość średnia",
      pidCode: "0xB6",
    },
    {
      title: "Czas pracy silnika",
      pidCode: "0x1F",
    },
    {
      title: "Czasy zapłonu",
      pidCode: "0x4E",
    },
  ],
};

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
