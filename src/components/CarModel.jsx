import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default function CarModel(props) {
  // Load MTL first
  const materials = useLoader(
    MTLLoader,
    process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL + "/models/F1 in schools v171 body.mtl"
      : "/models/F1 in schools v171 body.mtl"
  );
  // Then load OBJ using the MTL
  const obj = useLoader(
    OBJLoader,
    process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL + "/models/F1 in schools v171 body.obj"
      : "/models/F1 in schools v171 body.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  return <primitive object={obj} {...props} />;
}