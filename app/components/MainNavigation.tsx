import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalStyles } from "../styles/globalStyles";

export const MainNavigation = () => {
  const router = useRouter();
  return (
    <View style={[styles.container, { backgroundColor: "#111" }]}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.navigate("/")}
      >
        <FontAwesome name="home" color="white" size={50} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.navigate("/car-info")}
      >
        <MaterialCommunityIcons name="car-info" color="white" size={50} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.navigate("/amqp-connect")}
        disabled
      >
        <View style={{ alignItems: "center", opacity: 0.5 }}>
          <Text
            style={[
              globalStyles.baseText,
              { fontSize: 27, fontWeight: "bold" },
            ]}
          >
            AMP
          </Text>
          <Text style={[globalStyles.baseText, { fontSize: 19 }]}>Connect</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.navigate("/")}
      >
        <FontAwesome6 name="power-off" color="#df4127" size={50} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.navigate("/settings")}
      >
        <Feather name="settings" color="white" size={50} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: 150,
    alignItems: "center",
    height: "100%",
    // borderRightWidth: 1,
    // borderRightColor: "#555",
    padding: 10,
    gap: 10,
  },
  item: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(0, 0, 0, .6)",
    borderRadius: 10,
  },
});
