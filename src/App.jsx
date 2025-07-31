import React, { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// NP Racing SVG Logo (original colors)
function NPLogo({ size = 220 }) {
  return (
    <svg
      width={size}
      height={(size * 30.96) / 104.14}
      viewBox="0 0 104.1419 30.962112"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* RACING text paths */}
      <g transform="translate(-54.124261,-130.25079)">
        {/* ... include all path elements exactly as original source ... */}
      </g>
    </svg>
  );
}

function LoadingScreen({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed",
      zIndex: 1000,
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffcc00",
      fontFamily: "'Inconsolata', monospace",
      fontSize: 38,
      letterSpacing: 2
    }}>
      <NPLogo size={200} />
      <div style={{ marginTop: 42 }}>Loading Model...</div>
    </div>
  );
}

function TopBar() {
  return (
    <div
      style={{
        width: "100vw",
        height: "90px",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        borderBottom: "1px solid #222",
        fontFamily: "'Inconsolata', monospace"
      }}>
      <a href="/" style={{ display: "block" }}>
        <NPLogo size={100} />
      </a>
      <nav style={{ display: "flex", alignItems: "center" }}>
        <a href="/" style={navLinkStyle}>Home</a>
        <span style={navDotStyle}>•</span>
        <a href="/team.html" style={navLinkStyle}>Team</a>
        <span style={navDotStyle}>•</span>
        <a href="/schedule.html" style={navLinkStyle}>Schedule</a>
        <span style={navDotStyle}>•</span>
        <a href="/contact.html" style={navLinkStyle}>Contact</a>
      </nav>
    </div>
  );
}

const navLinkStyle = {
  color: "#fff",
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 1,
  marginRight: 16,
  fontFamily: "'Inconsolata', monospace",
  textDecoration: "none",
  cursor: "pointer"
};

const navDotStyle = {
  color: "#ffcc00",
  fontWeight: 700,
  fontSize: 20,
  marginRight: 16
};

function FloatingObjModel({ onLoad }) {
  const obj = useLoader(OBJLoader, "/models/F1 in schools v171 body.obj", undefined, onLoad);

  // apply polygon offset and update material
  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.polygonOffset = true;
        child.material.polygonOffsetFactor = 1;
        child.material.polygonOffsetUnits = 1;
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
    <mesh
      position={[0, -36000, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[300000, 300000]} />
      <shadowMaterial opacity={0.35} />
    </mesh>
  );
}

function ThreeDCar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  function handleModelLoaded() {
    setLoading(false);
  }

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        background: "#000",
        borderRadius: 16,
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
        camera={{ position: [0, 0, 200000], fov: 7, near: 0.1, far: 1000000 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>
        <directionalLight
          castShadow
          intensity={1.5}
          position={[0, 100000, 100000]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.001}
          shadow-normalBias={0.05}
        />
        <Suspense fallback={null}>
          <FloatingObjModel onLoad={handleModelLoaded} />
          <ShadowPlane />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} target={[0, 0, 0]} minPolarAngle={0.2} maxPolarAngle={Math.PI - 0.2} />
      </Canvas>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#000",
        fontFamily: "'Inconsolata', monospace",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TopBar />
      <ThreeDCar />
    </div>
  );
}

  );
}
