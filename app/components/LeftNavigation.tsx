import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { appConfig } from "../appConfig";
import { readExcelFile } from "../common/helpers";

const leftNavIconsColor = "#ccc";

export const LeftNavigation = () => {
  const router = useRouter();

  return (
    <View style={styles.leftNavigation}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("/car-info")}
      >
        <AntDesign name="menu-fold" color={leftNavIconsColor} size={45} />
      </TouchableOpacity>

      {appConfig.isConnectedWithautomotiveplace && (
        <TouchableOpacity style={styles.button}>
          <Feather name="play" color={leftNavIconsColor} size={50} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("/charts")}
      >
        <AntDesign name="linechart" color={leftNavIconsColor} size={45} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => readExcelFile()}
        // onPress={() => router.navigate("/car-info-settings")}
      >
        <Feather name="settings" color={leftNavIconsColor} size={50} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftNavigation: {
    borderRightColor: "#333",
    borderRightWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
