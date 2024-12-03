import React from "react";
import { View } from "react-native";
import { runOnUI } from "react-native-reanimated";
import { GLView } from "expo-gl";

function render(gl) {
  "worklet";
  // add your WebGL code here
}

function onContextCreate(gl) {
  runOnUI((contextId: number) => {
    "worklet";
    const gl = GLView.getWorkletContext(contextId);
    render(gl);
  })(gl.contextId);
}

export default function ModelComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GLView
        style={{ width: 300, height: 300 }}
        enableExperimentalWorkletSupport
        onContextCreate={onContextCreate}
      />
    </View>
  );
}
