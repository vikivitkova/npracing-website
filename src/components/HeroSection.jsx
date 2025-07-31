import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import CarModel from "./CarModel";
import styled from "styled-components";

const HeroWrap = styled.section`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Loader() {
  const { progress } = useProgress();
  return <Html center style={{ color: "#ffcc00", fontFamily: "Inconsolata" }}>Loading 3D model... {progress.toFixed(0)}%</Html>;
}

export default function HeroSection() {
  return (
    <HeroWrap id="home">
      <Canvas camera={{ position: [0, 1, 10], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <Suspense fallback={<Loader />}>
          <CarModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={true}
          autoRotate
          autoRotateSpeed={1.3}
        />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          color: "#fff",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h1 style={{ fontSize: "4rem", color: "#ffcc00" }}>NP Racing</h1>
        <h2 style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>Racing into Victory</h2>
      </div>
    </HeroWrap>
  );
}