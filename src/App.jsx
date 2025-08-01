import React, { useEffect, useState, Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  Center,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { EffectComposer, SSAO } from "@react-three/postprocessing";

// NP Racing SVG Logo (20% smaller)
function NPLogo({ size = 300 }) {
  return (
    <svg
      //src="/npracing.svg"
      alt="NP Racing Logo"
      width={size}
      viewBox="0 0 104.1419 30.962112"
      height={(size * 30.96) / 104.14}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}>
      <g transform="translate(-54.124261,-130.25079)">
        <g
          transform="translate(0,-2.4052947)"
          style={{
            fontSize: 17.6389,
            fontFamily: "Inconsolata, monospace",
            fill: "#fff",
            strokeWidth: 0.264583
          }}
        >
          <g
            transform="scale(1.1966041,0.83569829)"
            style={{
              fontSize: 14.1111,
              fontFamily: "Inconsolata, monospace",
              letterSpacing: 5.29167,
              fill: "#fff",
              strokeWidth: 2.21112
            }}
          >
            {/* RACING text paths */}
            <path d="m 53.020878,195.78621 h -2.060221 l -2.610554,-2.65289 h -1.509887 v 2.65289 H 45.23155 v -7.02733 h 6.02544 q 1.580443,0 1.580443,1.22767 v 1.91911 q 0,0.889 -0.818444,1.22766 h -1.693332 z m -1.763888,-4.41678 v -0.84666 q 0,-0.55033 -0.465666,-0.55033 h -3.951108 v 1.96144 h 3.951108 q 0.465666,0 0.465666,-0.56445 z" />
            <path d="m 69.474419,195.78621 h -1.566332 l -0.917222,-1.53811 h -4.571996 l -0.874888,1.53811 h -1.622777 l 3.965219,-7.05555 h 1.566332 z m -3.217331,-2.82222 -1.580443,-2.86455 -1.566332,2.86455 z" />
            <path d="m 84.756759,194.1211 q 0,0.98778 -0.380999,1.32644 -0.366889,0.33867 -1.368777,0.33867 h -4.190997 q -1.001888,0 -1.382888,-0.33867 -0.366888,-0.33866 -0.366888,-1.32644 v -3.71122 q 0,-0.97367 0.366888,-1.31233 0.381,-0.35278 1.382888,-0.35278 h 4.190997 q 1.693332,0.0141 1.749776,1.17122 v 1.03011 h -1.636887 v -0.94544 h -4.416775 v 4.45911 h 4.416775 v -1.03011 h 1.636887 z" />
            <path d="m 95.438876,195.78621 h -1.622777 v -7.05555 h 1.622777 z" />
            <path d="m 112.80966,195.78621 h -1.42522 l -5.37633,-4.93889 v 4.93889 h -1.49578 v -7.05555 h 1.397 l 5.43278,4.92477 v -4.92477 h 1.46755 z" />
            <path d="m 130.26509,194.1211 q 0,0.98778 -0.381,1.32644 -0.36688,0.33867 -1.36877,0.33867 h -4.84011 q -1.00189,0 -1.38289,-0.33867 -0.36689,-0.33866 -0.36689,-1.32644 v -3.69711 q 0,-0.98778 0.36689,-1.32644 0.381,-0.33867 1.38289,-0.33867 h 4.84011 q 1.04422,0 1.397,0.36689 0.35277,0.35278 0.35277,1.38289 h -1.59455 v -0.49389 h -5.10822 v 4.445 h 5.10822 v -1.56634 h -2.94922 v -1.19944 h 4.54377 z" />
          </g>
        </g>
        <path
          style={{
            fill: "#ffcc00",
            strokeWidth: 1.61928,
            strokeLinecap: "round"
          }}
          d="m 64.083427,130.25096 -9.959082,21.06022 h 4.532023 l 9.959082,-21.06022 z m 11.342977,0 -9.959082,21.06022 h 1.139465 4.505151 3.62872 l 9.959082,-21.06022 h -3.628719 -4.505152 z m 14.738635,0 -9.959082,21.06022 h 1.783354 v 5.1e-4 h 13.889591 l 0.535368,-1.13223 h -0.001 l 9.42371,-19.9285 H 97.007033 91.94791 Z"
        />
        <path
          style={{
            fill: "#fff",
            strokeLinejoin: "round"
          }}
          d="m 111.60859,130.25083 c -0.96683,0.005 -1.91905,0.53479 -2.3828,1.51567 L 101.76888,147.53246 100,151.27435 h 5.85287 l 0.69867,-1.47846 h 5.2e-4 l 5.77949,-12.22045 11.88247,12.88242 c 1.27166,1.38021 3.53608,1.03468 4.33824,-0.66197 l 6.74016,-14.25185 h 16.1463 l -2.44895,5.17747 h -8.20725 l -2.50217,5.29115 h 12.38477 c 1.02253,-1.7e-4 1.95344,-0.58946 2.39107,-1.51361 l 4.95267,-10.46861 c 0.83036,-1.75547 -0.45016,-3.77762 -2.3921,-3.77755 h -21.99814 c -1.02309,-4.3e-4 -1.95475,0.58896 -2.39262,1.51361 l -5.7795,12.22096 -11.88247,-12.88294 c -0.53648,-0.58227 -1.24991,-0.85758 -1.95544,-0.85369 z"
        />
      </g>
    </svg>
  );
}

function TopBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Responsive sizes
  const logoSize = isMobile ? 80 : 120;
  const linkFontSize = isMobile ? 14 : 16;
  const linkSpacing = isMobile ? 8 : 12;

  const linkStyle = {
    color: "#fff",
    fontSize: linkFontSize,
    fontWeight: 600,
    letterSpacing: 1,
    marginRight: linkSpacing,
    fontFamily: "'Inconsolata', monospace",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const dotStyle = {
    color: "#ffcc00",
    fontSize: linkFontSize + 2,
    marginRight: linkSpacing,
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
        <NPLogo size={logoSize} />
      </a>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",     // allow wrapping if needed
          overflowX: "auto",    // scroll instead of overlap
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
      fontSize: 13, letterSpacing: 2, zIndex: 1000
    }}>
      <NPLogo size={200} />
      <div style={{ position: "absolute", alignItems: "center", paddingTop: 150, }}>Loading…</div>
    </div>
  );
}

function InteractiveModel({ onLoad, controlRef, scale }) {
  const obj = useLoader(OBJLoader, "/models/F1.obj");
  const group = useRef();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (obj && !initialized) {
      obj.traverse((c) => {
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
      <primitive object={obj} scale={scale} position={[0, 0, 0.5]} />
    </group>
  );
}

function ShadowPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[300000, 300000]} />
      <shadowMaterial opacity={0.7} />
    </mesh>
  );
}

function ThreeDCar() {
  const [loading, setLoading] = useState(true);
  const modelRef = useRef();
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [modelScale, setModelScale] = useState(600000);

  // Mobile detection, scale & disable scroll
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const onResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setModelScale(mobile ? 250000 : 600000);
    };
    onResize();
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, []);

  // Drag‐to‐rotate
  const onPointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    prev.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    e.preventDefault();
    dragging.current = false;
  };
  const onPointerMove = (e) => {
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

  // Responsive camera
  const cameraSettings = isMobile
    ? { position: [0, 0, modelScale * 0.33], fov: 10, near: 10000, far: 500000 }
    : { position: [0, 0, 200000], fov: 7, near: 10000, far: 500000 };

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "none",
      }}
    >
      {loading && <LoadingScreen />}

      <Canvas
        shadows
        dpr={[1, 2]}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        camera={cameraSettings}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.useLegacyLights = false;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.6;
        }}
      >
        {/* subtle fill */}
        <hemisphereLight skyColor={0x222222} groundColor={0x000000} intensity={0.05} />

        {/* main key light */}
        <directionalLight
          castShadow
          intensity={3}
          position={[200000, 300000, 200000]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
          shadow-normalBias={0.05}
        />

        {/* rim light */}
        <directionalLight intensity={0.3} position={[-200000, -100000, -200000]} />

        <Suspense fallback={null}>
          <Environment preset="city" background={false} />

          <Center>
            <InteractiveModel
              onLoad={() => setLoading(false)}
              controlRef={modelRef}
              scale={modelScale}
            />
          </Center>

          <ContactShadows
            rotation-x={-Math.PI / 2}
            position={[0, 0, 0]}
            width={300000}
            height={300000}
            blur={2}
            opacity={0.7}
            far={500000}
          />

          <AccumulativeShadows
            frames={60}
            temporal
            color="black"
            colorBlend={2}
            opacity={1}
            scale={1.2}
            alphaTest={0.85}
          >
            <RandomizedLight
              amount={8}
              radius={2}
              ambient={0.2}
              intensity={1.5}
              position={[100000, 300000, 100000]}
              bias={0.0001}
            />
          </AccumulativeShadows>
          <EffectComposer multisampling={0}>
            <SSAO
              samples={32}
              radius={0.5}
              intensity={30}
              luminanceInfluence={0.1}
              color="black"
            />
          </EffectComposer>
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
