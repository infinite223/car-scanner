import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber/native";
import { appConfig } from "../appConfig";

function BlueBox(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export const Model = () => {
  if (!appConfig.show3dModel) {
    return;
  }

  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 10, 0] }} events={undefined}>
        <ambientLight />
        <BlueBox position={[0, 0, 0]} />
        {/* <DraggableModel scale={1.5} /> */}
      </Canvas>
    </Suspense>
  );
};
