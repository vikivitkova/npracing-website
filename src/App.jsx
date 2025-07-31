import React, { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// NP Racing SVG Logo (original full code)
function NPLogo({ size = 420 }) {
  return (
    <svg
      width={size}
      height={(size * 30.96) / 104.14}
      viewBox="0 0 104.1419 30.962112"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <g transform="translate(-54.124261,-130.25079)">
        <g
          transform="translate(0,-2.4052947)"
          style={{
            fontSize: 17.6389,
            fontFamily: 'Inconsolata, monospace',
            fill: "#fff",
            strokeWidth: 0.264583
          }}
        >
          <g
            transform="scale(1.1966041,0.83569829)"
            style={{
              fontSize: 14.1111,
              fontFamily: 'Inconsolata, monospace',
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
        {/* Yellow accent paths */}
        <path
          style={{
            fill: "#ffcc00",
            strokeWidth: 1.61928,
            strokeLinecap: "round"
          }}
          d="m 64.083427,130.25096 -9.959082,21.06022 h 4.532023 l 9.959082,-21.06022 z m 11.342977,0 -9.959082,21.06022 h 1.139465 4.505151 3.62872 l 9.959082,-21.06022 h -3.628719 -4.505152 z m 14.738635,0 -9.959082,21.06022 h 1.783354 v 5.1e-4 h 13.889591 l 0.535368,-1.13223 h -0.001 l 9.42371,-19.9285 H 97.007033 91.94791 Z"
        />
        {/* White accent paths */}
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
      <NPLogo size={420} />
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
        padding: "0 48px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        borderBottom: "1px solid #222",
        fontFamily: "'Inconsolata', monospace"
      }}>
      <a href="/" style={{ display: "block" }}>
        <NPLogo size={220} />
      </a>
      <nav style={{ display: "flex", alignItems: "center", marginLeft: 48 }}>
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
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: 1,
  marginRight: 32,
  fontFamily: "'Inconsolata', monospace",
  textDecoration: "none",
  cursor: "pointer"
};

const navDotStyle = {
  color: "#ffcc00",
  fontWeight: 700,
  fontSize: 36,
  marginRight: 32
};

function FloatingObjModel({ onLoad }) {
  const obj = useLoader(OBJLoader, "/models/F1 in schools v171 body.obj", undefined, onLoad);

  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.polygonOffset = true;
        child.material.polygonOffsetFactor = 5;  // Increased
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

  return (
    <div style={{ width: "100%", flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "90px" }}>
      <LoadingScreen visible={loading} />
      <Canvas
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputEncoding: THREE.sRGBEncoding }}
        camera={{ position: [0, 0, 200000], fov: 7, near: 10000, far: 500000 }}  // Adjusted near/far
        style={{ background: "transparent", width: "800px", height: "600px" }}
        onCreated={({ gl }) => { gl.shadowMap.enabled = true; gl.shadowMap.type = THREE.PCFSoftShadowMap; }}
      >
        <Suspense fallback={null}><Environment preset="city" background={false} /></Suspense>
        <directionalLight
          castShadow
          intensity={1.5}
          position={[0, 100000, 100000]}
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-bias={0.005}
          shadow-normalBias={0.2}
          shadow-camera-near={50000}
          shadow-camera-far={200000}
          shadow-camera-left={-100000}
          shadow-camera-right={100000}
          shadow-camera-top={100000}
          shadow-camera-bottom={-100000}
        />
        <Suspense fallback={null}><FloatingObjModel onLoad={() => setLoading(false)} /><ShadowPlane /></Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.1} target={[0, 0, 0]} minPolarAngle={0.2} maxPolarAngle={Math.PI - 0.2} />
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
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "#000", fontFamily: "'Inconsolata', monospace", overflow: "hidden" }}>
      <TopBar />
      <ThreeDCar />
    </div>
  );
}
