import React, { useEffect, useState, Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Temporary placeholder logo so we know the page loads
function NPLogo({ size = 176 }) {
  return (
    <div
      style={{
        width: size,
        height: (size * 30.96) / 104.14,
        background: "#ffcc00",
      }}
    />
  );
}

function TopBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: 90,
        background: "#000",
        display: "flex",
        alignItems: "center",
        padding: "0 48px",
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      <NPLogo />
    </div>
  );
}

// A simple spinning box placeholder
function SpinningBox() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[100000, 100000, 100000]} />
      <meshStandardMaterial color="#1565C0" />
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
        overflow: "hidden",
        fontFamily: "'Inconsolata', monospace",
      }}
    >
      <TopBar />
      <Canvas
        shadows
        camera={{ position: [0, 0, 300000], fov: 7, near: 1000, far: 1000000 }}
        style={{
          position: "absolute",
          top: 90, // push below the top bar
          left: 0,
          width: "100%",
          height: "calc(100vh - 90px)",
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* minimal fill */}
        <ambientLight intensity={0.1} />

        {/* world-fixed directional light */}
        <directionalLight
          castShadow
          intensity={2}
          position={[100000, 200000, 300000]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
          shadow-normalBias={0.1}
        />

        {/* environment for reflections */}
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>

        {/* center & box */}
        <Center>
          <SpinningBox />
        </Center>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
}

