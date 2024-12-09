import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { View } from "react-native";

// Funkcja ładująca model GLTF
function Model(props: JSX.IntrinsicElements["group"]) {
  const mesh = useRef<THREE.Mesh | null>(null);
  const { nodes, materials } = useGLTF(require("../assets/Model.glb"));

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01; // Dodaj animację
    }
  });

  return (
    <group {...props}>
      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        geometry={nodes.pasted__model1.geometry}
        material={materials.koltuk}
      />
      {/* Dodaj inne meshe, jeśli potrzebne */}
    </group>
  );
}

// Funkcja do ładowania GLTF
function useGLTF(url: string) {
  const [model, setModel] = React.useState<GLTF | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      setModel(gltf);
    });
  }, [url]);

  if (!model) return { nodes: {}, materials: {} };
  return { nodes: model.nodes, materials: model.materials };
}

// Komponent Canvas z modelem
export default function ModelComponent() {
  return (
    <Canvas style={{ flex: 1 }} camera={{ position: [0, 0, 5], fov: 75 }}>
      {/* <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Model scale={2} position={[0, -1.4, 0]} />
      </Suspense> */}
    </Canvas>
  );
}
