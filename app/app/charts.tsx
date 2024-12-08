import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
} from "react-native-responsive-linechart";
import { MainNavigation } from "../components/MainNavigation";
import { globalStyles, SCREEN_HEIGHT } from "../styles/globalStyles";
import { useNavigation } from "expo-router";

const data1 = [
  { x: -2, y: 1 },
  { x: -1, y: 0 },
  { x: 8, y: 13 },
  { x: 9, y: 11.5 },
  { x: 10, y: 12 },
];

const data2 = [
  { x: -2, y: 15 },
  { x: -1, y: 10 },
  { x: 0, y: 12 },
  { x: 1, y: 7 },
  { x: 8, y: 12 },
  { x: 9, y: 13.5 },
  { x: 10, y: 18 },
];

const charts = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={[globalStyles.screenContainer, {}]}>
      <MainNavigation />
      <Chart
        style={{ height: SCREEN_HEIGHT, width: "100%" }}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: -2, max: 20 }}
        padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
      >
        <VerticalAxis
          tickValues={[0, 10, 20]}
          theme={{
            axis: { visible: false },
            grid: { stroke: { color: "#444" } },
          }}
        />
        {/* <HorizontalAxis tickCount={3} /> */}
        <Line
          data={data1}
          smoothing="none"
          theme={{ stroke: { color: "white", width: 2 } }}
        />
        <Line
          data={data2}
          smoothing="cubic-spline"
          theme={{ stroke: { color: "red", width: 2 } }}
        />
      </Chart>
    </SafeAreaView>
  );
};

export default charts;
