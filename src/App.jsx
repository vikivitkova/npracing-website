import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function FloatingObjModel() {
  const obj = useLoader(OBJLoader, "/models/F1 in schools v171 body.obj");
  return (
    <primitive
      object={obj}
      scale={1000}
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
      <shadowMaterial opacity={0.5} />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#181b2c" }}>
      <Canvas
        camera={{ position: [0, 0, 40], fov: 60 }}
        shadows
        gl={{ antialias: true }}
      >
        {/* Minimal key light from camera, casting shadow */}
        <directionalLight
          position={[0, 0, 40]} // Same as camera
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        {/* Subtle fill/rim light from behind */}
        <directionalLight
          position={[0, 0, -40]}
          intensity={0.3}
        />
        <Suspense fallback={<Html center>Loading Model...</Html>}>
          <FloatingObjModel />
        </Suspense>
        <ShadowPlane />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
