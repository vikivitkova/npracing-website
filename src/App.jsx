import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
      scale={2000}
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

export default function App() {
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
      <div style={{
        position: "absolute",
        left: 0,
        top: 64,           // Just below the bar menu
        width: "100vw",
        height: "calc(100vh - 64px)"
      }}>
        <Canvas
          shadows
          gl={{ antialias: true }}
          camera={{
            position: [0, 0, 200],      // Much longer focal length
            fov: 20,                    // Narrower field of view for telephoto look
            near: 0.1,
            far: 1000
          }}
          style={{
            background: "transparent"
          }}
        >
          {/* Realistic lighting: spotlight shines almost directly at camera */}
          <spotLight
            position={[0, 40, 200]}      // Offset from camera, above and slightly forward
            angle={0.25}
            penumbra={0.8}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            target-position={[0, 0, 0]}  // Aim at the origin/model
          />
          {/* Subtle fill light from behind for rim lighting */}
          <directionalLight
            position={[0, 30, -100]}
            intensity={0.2}
          />
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
