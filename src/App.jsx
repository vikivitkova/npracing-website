import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

function TopBar() {
  // ...same as before...
}

function FloatingObjModel() {
  const obj = useLoader(OBJLoader, "/models/F1 in schools v171 body.obj");
  return (
    <primitive
      object={obj}
      scale={10}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

function ShadowPlane() {
  return (
    <mesh
      position={[0, -12, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.35} />
    </mesh>
  );
}

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <TopBar />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 64,
          width: "100vw",
          height: "calc(100vh - 64px)"
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 40], fov: 60 }}
          shadows
          gl={{
            antialias: true,
            physicallyCorrectLights: true, // enables realistic light calculations
            toneMapping: THREE.ACESFilmicToneMapping, // optional: better color grading
            outputEncoding: THREE.sRGBEncoding
          }}
          style={{ background: "transparent" }}
        >
          {/* Realistic key light */}
          <spotLight
            position={[40, 60, 40]}
            intensity={2}
            angle={0.35}
            penumbra={0.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            color="#fff"
          />
          {/* Fill/rim light for highlights */}
          <spotLight
            position={[-40, 20, -50]}
            intensity={0.7}
            angle={0.5}
            penumbra={1}
            color="#aaf"
          />
          {/* (Optional) subtle ambient light */}
          <ambientLight intensity={0.15} />
          {/* (Optional) HDRI or studio environment */}
          <Environment preset="studio" background={false} blur={0.8} />
          <Suspense fallback={null}>
            <FloatingObjModel />
          </Suspense>
          <ShadowPlane />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            target={[0, 0, 0]}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI - 0.2}
          />
        </Canvas>
      </div>
    </div>
  );
}
