import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Inline NP Racing SVG Logo
function NPLogo({ size = 160 }) {
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

// Top bar menu
function TopBar({ active, onMenuClick }) {
  const menuItems = [
    { label: "Home", key: "home" },
    { label: "Team", key: "team" },
    { label: "Schedule", key: "schedule" },
    { label: "Contact", key: "contact" }
  ];
  return (
    <div
      style={{
        width: "100vw",
        height: "90px",
        background: "#000",
        display: "flex",
        alignItems: "center",
        padding: "0 48px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        borderBottom: "1px solid #222",
        fontFamily: "'Inconsolata', monospace"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", minWidth: 180 }}>
        <NPLogo size={160} />
      </div>
      <nav style={{ display: "flex", alignItems: "center", marginLeft: 40 }}>
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.key}>
            <span
              style={{
                color: active === item.key ? "#ffcc00" : "#fff",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 1,
                marginRight: idx !== menuItems.length - 1 ? 32 : 0,
                fontFamily: "'Inconsolata', monospace",
                cursor: "pointer",
                transition: "color 0.2s"
              }}
              onClick={() => onMenuClick(item.key)}
            >
              {item.label}
            </span>
            {idx !== menuItems.length - 1 && (
              <span
                style={{
                  color: "#ffcc00",
                  fontWeight: 700,
                  fontSize: 36,
                  marginRight: 32
                }}
              >•</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

// Loading screen
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
      <NPLogo size={320} />
      <div style={{marginTop: 42}}>Loading Model...</div>
    </div>
  );
}

// 3D Model
function FloatingObjModel({ onLoad }) {
  const obj = useLoader(OBJLoader, "/models/F1 in schools v171 body.obj", undefined, onLoad);
  return (
    <primitive
      object={obj}
      scale={2500}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Shadow plane for realistic shadow
function ShadowPlane() {
  return (
    <mesh
      position={[0, -12, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.35} />
    </mesh>
  );
}

// Placeholder Page Content
function PageContent({ page }) {
  const pageStyles = {
    fontFamily: "'Inconsolata', monospace",
    color: "#fff",
    padding: "110px 48px 0 48px",
    minHeight: "calc(100vh - 90px)",
    background: "#000"
  };
  switch (page) {
    case "home":
      return (
        <div style={pageStyles}>
          <h1 style={{ color: "#ffcc00", fontSize: 44, marginBottom: 24 }}>NP Racing</h1>
          <p style={{ fontSize: 24 }}>Welcome to NP Racing's F1 in Schools Team! Explore the car in 3D, meet our team, view the schedule, and contact us.</p>
          <div style={{ height: 400, marginTop: 48, position: "relative" }}>
            {/* 3D Canvas inserted below */}
            <ThreeDCar />
          </div>
        </div>
      );
    case "team":
      return (
        <div style={pageStyles}>
          <h1 style={{ color: "#ffcc00", fontSize: 44, marginBottom: 24 }}>Our Team</h1>
          <p style={{ fontSize: 24 }}>Meet the talented members behind NP Racing. (Team bios, roles, photos go here.)</p>
        </div>
      );
    case "schedule":
      return (
        <div style={pageStyles}>
          <h1 style={{ color: "#ffcc00", fontSize: 44, marginBottom: 24 }}>Schedule</h1>
          <p style={{ fontSize: 24 }}>Check out our upcoming events, races, and milestones. (Schedule details go here.)</p>
        </div>
      );
    case "contact":
      return (
        <div style={pageStyles}>
          <h1 style={{ color: "#ffcc00", fontSize: 44, marginBottom: 24 }}>Contact Us</h1>
          <p style={{ fontSize: 24 }}>Reach out to NP Racing for any inquiries. (Contact form or info goes here.)</p>
        </div>
      );
    default:
      return null;
  }
}

// 3D Canvas isolated for Home page only
function ThreeDCar() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Ensure font loads
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
    <div style={{ width: "100%", height: "400px", background: "#000", borderRadius: 16, position: "relative" }}>
      <LoadingScreen visible={loading} />
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: 1, // THREE.ReinhardToneMapping
          outputEncoding: 3001, // THREE.sRGBEncoding
        }}
        camera={{
          position: [0, 0, 200],
          fov: 10,
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
        {/* HDRI environment for realistic reflections, but only for indirect lighting */}
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>
        {/* Single spotlight, fixed in scene coordinates */}
        <spotLight
          position={[0, 50, 200]}
          angle={0.17}
          penumbra={1}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          target-position={[0, 0, 0]}
          color="#fff"
        />
        <Suspense fallback={null}>
          <FloatingObjModel onLoad={handleModelLoaded} />
          <ShadowPlane />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          target={[0, 0, 0]}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI - 0.2}
        />
      </Canvas>
    </div>
  );
}

// Main App
export default function App() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    // Load Google Fonts
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
        minHeight: "100vh",
        background: "#000",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Inconsolata', monospace"
      }}
    >
      <TopBar active={activePage} onMenuClick={setActivePage} />
      <div style={{ paddingTop: 90 }}>
        <PageContent page={activePage} />
      </div>
    </div>
  );
}
