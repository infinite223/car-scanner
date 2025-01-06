import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import { CarInfo } from "../../common/types";

const BaseScreen = () => {
  const mustang = require("../../assets/mustang.png");

  const currentLoadCar: CarInfo = {
    hp: 305,
    nm: 385,
    make: "Ford",
    model: "Mustang",
  };

  return (
    <View style={[globalStyles.homeScreen, styles.fixNavigationMargin]}>
      <View style={styles.container}>
        <View>
          <Text style={[globalStyles.baseText, styles.textModel]}>
            {currentLoadCar.model}
          </Text>

          <Text style={[globalStyles.baseText, styles.textMake]}>
            {currentLoadCar.make}
          </Text>
        </View>

        <View style={styles.carinfoItems}>
          <View style={styles.carinfoItem}>
            <Text
              style={[
                globalStyles.baseText,
                { fontSize: 30, fontWeight: "800" },
              ]}
            >
              {currentLoadCar.hp} hp
            </Text>

            <Text style={[globalStyles.baseText, { fontSize: 25 }]}>
              Moc silnika
            </Text>
          </View>

          <View style={styles.carinfoItem}>
            <Text
              style={[
                globalStyles.baseText,
                { fontSize: 30, fontWeight: "800" },
              ]}
            >
              {currentLoadCar.nm} Nm
            </Text>

            <Text style={[globalStyles.baseText, { fontSize: 25 }]}>
              Moment obrotowy
            </Text>
          </View>
        </View>

        <Image source={mustang} style={styles.image} />
      </View>
    </View>
  );
};

export default BaseScreen;

const styles = StyleSheet.create({
  fixNavigationMargin: {
    paddingLeft: 150,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  textModel: {
    fontSize: 85,
    fontWeight: "900",
  },
  textMake: {
    fontSize: 35,
    fontWeight: "600",
  },
  carinfoItems: {
    marginTop: 20,
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  carinfoItem: {
    borderColor: "#444",
    borderWidth: 2,
    borderRadius: 5,
    padding: 20,
    gap: 5,
  },
  image: {
    width: 800,
    height: 550,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 50,
    opacity: 0.5,
  },
});
