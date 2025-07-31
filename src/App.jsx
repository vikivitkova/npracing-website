import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

function Halo() {
  return (
    <mesh>
      <ringGeometry args={[2.2, 2.5, 64]} />
      <meshBasicMaterial
        color={"#00ffff"}
        transparent
        opacity={0.45}
        side={2}
      />
    </mesh>
  );
}

function FloatingModel() {
  return (
    <group>
      <Halo />
      {/* Replace this sphere with your model (use Drei's <Model /> or <primitive />) */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[2, 64, 32]} />
        <meshStandardMaterial color="#8888ff" />
      </mesh>
      {/* Subtle shadow effect via Html */}
      <Html position={[0, -2.1, 0]} center>
        <div
          style={{
            width: "80px",
            height: "20px",
            background: "radial-gradient(ellipse at center, #00ffff33 0%, #fff0 100%)",
            borderRadius: "50%",
            filter: "blur(2px)",
            opacity: 0.7,
            margin: "0 auto"
          }}
        />
      </Html>
    </group>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#181b2c" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <FloatingModel />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
