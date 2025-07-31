import React, { Suspense, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Loader } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Top bar menu with SVG logo (replace with your own SVG if needed)
function TopBar() {
  return (
    <div
      style={{
        width: "100vw",
        height: "64px",
        background: "#111",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        borderBottom: "1px solid #222"
      }}
    >
      {/* Replace with your SVG logo as needed */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        style={{ marginRight: 18 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="#0ff" strokeWidth="8" fill="#181b2c" />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          fill="#0ff"
          fontSize="38"
          fontFamily="Arial"
          dy=".3em"
        >
          F1
        </text>
      </svg>
      <span style={{ color: "#fff", fontSize: 20, fontWeight: 600, letterSpacing: 1 }}>
        F1 in Schools
      </span>
      {/* Add more menu items here if needed */}
    </div>
  );
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
      <shadowMaterial opacity={0.4} />
    </mesh>
  );
}

// Custom full-screen loading overlay
function LoadingScreen() {
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
      color: "#0ff",
      fontFamily: "sans-serif",
      fontSize: 28,
      letterSpacing: 2
    }}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        style={{ marginBottom: 28 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="#0ff" strokeWidth="8" fill="#181b2c" />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          fill="#0ff"
          fontSize="38"
          fontFamily="Arial"
          dy=".3em"
        >
          F1
        </text>
      </svg>
      Loading Model...
    </div>
  );
}

export default function App() {
  // Use a state to control loading screen visibility
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000", // Pure black backdrop
        position: "relative",
        overflow: "hidden"
      }}
    >
      <TopBar />
      {loading && <LoadingScreen />}
      <div style={{
        position: "absolute",
        left: 0,
        top: 64,           // Just below the bar menu
        width: "100vw",
        height: "calc(100vh - 64px)"
      }}>
        <Canvas
          shadows
          gl={{
            antialias: true,
            toneMapping: 1, // THREE.ReinhardToneMapping
            outputEncoding: 3001, // THREE.sRGBEncoding
          }}
          camera={{
            position: [0, 0, 200],      // Much longer focal length
            fov: 20,                    // Narrower field of view for telephoto look
            near: 0.1,
            far: 1000
          }}
          style={{
            background: "transparent"
          }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = 2; // THREE.PCFSoftShadowMap
          }}
        >
          {/* Realistic environment lighting */}
          <Suspense fallback={null}>
            <Environment preset="city" background={false} />
          </Suspense>
          {/* SpotLight shines from the camera POV for realistic highlights/shadows */}
          <spotLight
            position={[0, 40, 200]}
            angle={0.22}
            penumbra={1}
            intensity={2.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            target-position={[0, 0, 0]}
          />
          {/* Subtle fill light from behind for rim lighting */}
          <directionalLight
            position={[0, 30, -100]}
            intensity={0.3}
          />
          <Suspense fallback={null}>
            <FloatingObjModel />
            <ShadowPlane />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            target={[0, 0, 0]}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI - 0.2}
            onEnd={() => setLoading(false)} // Hide loader once user interacts
          />
        </Canvas>
        {/* Drei's built-in loader (optional, can be removed if not needed) */}
        <Loader
          containerStyles={{
            background: "rgba(0,0,0,0.85)",
            color: "#0ff"
          }}
          barStyles={{
            background: "#0ff"
          }}
          dataInterpolation={p => `Loading ${Math.round(p)}%`}
        />
      </div>
    </div>
  );
}
