import React, { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// SVG logo omitted for brevity, same as before…
function NPLogo({ size = 336 }) { /* … */ }

function LoadingScreen({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      background: "#000", display: "flex",
      alignItems: "center", justifyContent: "center",
      color: "#ffcc00", fontFamily: "'Inconsolata', monospace",
      fontSize: 38, letterSpacing: 2, zIndex: 1000
    }}>
      <NPLogo size={336} />
      <div style={{ marginTop: 42 }}>Loading Model…</div>
    </div>
  );
}

function TopBar() { /* same as before, with shrunk logo + smaller text */ }

function FloatingObjModel({ onLoad }) {
  const obj = React.useLoader(OBJLoader, "/models/F1 in schools v171 body.obj", undefined, onLoad);
  React.useEffect(() => {
    obj.traverse(child => {
      if (child.isMesh) {
        child.material.polygonOffset = true;
        child.material.polygonOffsetFactor = 5;
        child.material.polygonOffsetUnits = 5;
        child.material.needsUpdate = true;
      }
    });
  }, [obj]);
  return <primitive object={obj} scale={600000} position={[0, 0, 0.5]} castShadow receiveShadow />;
}

function ShadowPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[300000, 300000]} />
      <shadowMaterial opacity={0.35} />
    </mesh>
  );
}

function ThreeDCar() {
  const [loading, setLoading] = useState(true);

  // Load font once
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "calc(100vh - 90px)",  // fill under top bar
      marginTop: 90,
      background: "#000",
      position: "relative",
      overflow: "hidden"
    }}>
      <LoadingScreen visible={loading} />

      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding
        }}
        camera={{ position: [0, 0, 200000], fov: 7, near: 10000, far: 500000 }}
        style={{ background: "#000", width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Small ambient so darkest corners aren’t solid black */}
        <ambientLight intensity={0.1} />

        {/* WORLD‐FIXED directional light */}
        <directionalLight
          castShadow
          intensity={2}
          color={0xffffff}
          position={[100000, 200000, 300000]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
          shadow-normalBias={0.1}
        />

        {/* Environment for reflections */}
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>

        {/* Center both model and shadow plane at origin */}
        <Suspense fallback={null}>
          <Center>
            <FloatingObjModel onLoad={() => setLoading(false)} />
            <ShadowPlane />
          </Center>
        </Suspense>

        {/* OrbitControls only moves the CAMERA */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.1}
          target={[0, 0, 0]}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI - 0.2}
        />
      </Canvas>
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
      fontFamily: "'Inconsolata', monospace"
    }}>
      <TopBar />
      <ThreeDCar />
    </div>
  );
}
