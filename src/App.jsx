  import React, { useEffect, useState, Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Center, useHelper } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// NP Racing SVG Logo (20% smaller)
function NPLogo({ size = 300 }) {
  return (
    <svg
      src="/npracing.svg"
      alt="NP Racing Logo"
      width={size}
      height="auto"
      style={{ display: "block" }}
    </svg>
  );
}

function TopBar() {
  const linkStyle = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1,
    marginRight: 12,
    fontFamily: "'Inconsolata', monospace",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const dotStyle = {
    color: "#ffcc00",
    fontSize: 18,
    marginRight: 12,
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 80,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxSizing: "border-box",
        zIndex: 10,
        borderBottom: "1px solid #222",
      }}
    >
      <a href="/" style={{ display: "block" }}>
        <NPLogo size={120} />
      </a>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <a href="/" style={linkStyle}>Home</a>
        <span style={dotStyle}>•</span>
        <a href="/team.html" style={linkStyle}>Team</a>
        <span style={dotStyle}>•</span>
        <a href="/schedule.html" style={linkStyle}>Schedule</a>
        <span style={dotStyle}>•</span>
        <a href="/contact.html" style={linkStyle}>Contact</a>
      </nav>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0,
      width: "100%", height: "100%",
      background: "#000", display: "flex",
      alignItems: "center", justifyContent: "center",
      color: "#ffcc00", fontFamily: "'Inconsolata', monospace",
      fontSize: 38, letterSpacing: 2, zIndex: 1000
    }}>
      <NPLogo size={336} />
      <div style={{ position: "absolute", bottom: 60 }}>Loading Model…</div>
    </div>
  );
}

function InteractiveModel({ onLoad, controlRef }) {
  const obj = useLoader(OBJLoader, "/models/F1.obj");
  const group = useRef();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (obj && !initialized) {
      obj.traverse(c => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
          c.material.polygonOffset = true;
          c.material.polygonOffsetFactor = 5;
          c.material.polygonOffsetUnits = 5;
          c.material.needsUpdate = true;
        }
      });
      onLoad();
      setInitialized(true);
      controlRef.current = group.current;
    }
  }, [obj, initialized, onLoad, controlRef]);

  return (
    <group ref={group}>
      <primitive object={obj} scale={600000} position={[0, 0, 0.5]} />
    </group>
  );
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
  const modelRef = useRef();
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Responsive camera settings
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cameraSettings = isMobile
    ? { position: [0, 0, 300000], fov: 12, near: 10000, far: 500000 }
    : { position: [0, 0, 200000], fov: 7, near: 10000, far: 500000 };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600;700&display=swap";
    document.head.appendChild(link);

    // Prevent scrolling on mobile
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onPointerDown = e => {
    e.preventDefault();
    dragging.current = true;
    prev.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = e => {
    e.preventDefault();
    dragging.current = false;
  };
  const onPointerMove = e => {
    if (!dragging.current || !modelRef.current) return;
    e.preventDefault();
    const dx = e.clientX - prev.current.x;
    const dy = e.clientY - prev.current.y;
    modelRef.current.rotateOnWorldAxis(
      new THREE.Vector3(0, 1, 0),
      dx * 0.005
    );
    modelRef.current.rotateOnWorldAxis(
      new THREE.Vector3(1, 0, 0),
      dy * 0.005
    );
    prev.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div style={{
      top: 80,
      left: 0,
      right: 0,
      bottom: 0,
      background: "#000",
      touchAction: "none", // Prevent gestures
      WebkitOverflowScrolling: "touch"
      position: "relative",
      marginTop: 80,
      width: "100%",
      height: isMobile ? "calc(100vh - 80px)" : "calc(100vh - 80px)",
      background: "#000",
      overflow: "hidden"
    }}>
      {loading && <LoadingScreen />}

      <Canvas
        shadows
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        gl={{
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        camera={{
          position: isMobile ? [0, 0, 140000] : [0, 0, 200000], // <-- adjust zoom on mobile
          fov: isMobile ? 10 : 7,
          near: 10000,
          far: 500000
        }}
        style={{ width: "100%", height: "100%", background: "#000" }}
        onCreated={({ gl, scene }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.useLegacyLights = false;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.6;
        }}
      >
        <hemisphereLight skyColor={0x222222} groundColor={0x000000} intensity={0.15} />
        <directionalLight
          castShadow
          intensity={1.0}
          position={[200000, 300000, 200000]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
          shadow-normalBias={0.05}
        />
        <directionalLight intensity={0.2} position={[-200000, -100000, -200000]} />

        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>

        <Suspense fallback={null}>
          <Center>
            <InteractiveModel onLoad={() => setLoading(false)} controlRef={modelRef} />
            <ShadowPlane />
          </Center>
        </Suspense>
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
