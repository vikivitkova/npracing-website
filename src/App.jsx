import React, { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// NP Racing SVG Logo (20% smaller)
function NPLogo({ size = 336 }) {
  return (
    <svg
      width={size}
      height={(size * 30.96) / 104.14}
      viewBox="0 0 104.1419 30.962112"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* … full original paths here … */}
    </svg>
  );
}

function LoadingScreen({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", zIndex: 1000,
      left: 0, top: 0,
      width: "100vw", height: "100vh",
      background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      color: "#ffcc00", fontFamily: "'Inconsolata', monospace",
      fontSize: 38, letterSpacing: 2
    }}>
      <NPLogo size={336} />
      <div style={{ marginTop: 42 }}>Loading Model...</div>
    </div>
  );
}

function TopBar() {
  const linkStyle = {
    color: "#fff", fontSize: 20, fontWeight: 700,
    letterSpacing: 1, marginRight: 24,
    fontFamily: "'Inconsolata', monospace",
    textDecoration: "none"
  };
  const dotStyle = { color: "#ffcc00", fontSize: 24, marginRight: 24 };
  return (
    <div style={{
      width: "100vw", height: 90, background: "#000",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", boxSizing: "border-box",
      position: "fixed", top: 0, left: 0, zIndex: 10,
      borderBottom: "1px solid #222"
    }}>
      <a href="/" style={{ display: "block" }}><NPLogo size={176} /></a>
      <nav style={{ display: "flex", alignItems: "center" }}>
        <a href="/" style={linkStyle}>Home</a><span style={dotStyle}>•</span>
        <a href="/team.html" style={linkStyle}>Team</a><span style={dotStyle}>•</span>
        <a href="/schedule.html" style={linkStyle}>Schedule</a><span style={dotStyle}>•</span>
        <a href="/contact.html" style={linkStyle}>Contact</a>
      </nav>
    </div>
  );
}

function FloatingObjModel({ onLoad }) {
  const obj = useLoader(
    OBJLoader,
    "/models/F1 in schools v171 body.obj",
    undefined,
    onLoad
  );
  useEffect(() => {
    obj.traverse(child => {
      if (child.isMesh) {
        child.material.polygonOffset = true;
        child.material.polygonOffsetFactor = 5;
        child.material.polygonOffsetUnits = 5;
        child.material.needsUpdate = true;
      }
    });
  }, [obj]);
  return (
    <primitive
      object={obj}
      scale={600000}
      position={[0, 0, 0.5]}
      castShadow
      receiveShadow
    />
  );
}

function ShadowPlane() {
  return (
    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
      <planeGeometry args={[300000,300000]} />
      <shadowMaterial opacity={0.35} />
    </mesh>
  );
}

function ThreeDCar() {
  const [loading, setLoading] = useState(true);

  // load font once
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
      marginTop: 90,                 // push below top bar
      background: "#000",
      position: "relative"
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
        {/* minimal fill so darkest areas aren’t pure black */}
        <ambientLight intensity={0.15} />

        {/* world-fixed directional light */}
        <directionalLight
          castShadow
          intensity={2}
          position={[100000, 200000, 300000]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
          shadow-normalBias={0.1}
        />

        {/* HDR reflections */}
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>

        <Suspense fallback={null}>
          <Center>
            <FloatingObjModel onLoad={() => setLoading(false)} />
            <ShadowPlane />
          </Center>
        </Suspense>

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
