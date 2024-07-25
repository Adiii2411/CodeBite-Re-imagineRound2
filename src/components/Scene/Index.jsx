import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Model from "./Model";
import Stars from "./Stars";
import { Environment } from "@react-three/drei";
import styles from "./style.module.scss";

const CameraController = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    // Adjust camera position based on mouse coordinates
    camera.position.x = mouse.current.x * 0.5;
    camera.position.y = mouse.current.y * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Scene = () => {
  return (
    <Canvas className={styles.scene} camera={{ position: [0, 0, 5], fov: 75 }}>
      <CameraController />
      <Stars />
      <Model />
      <directionalLight intensity={0.2} position={[4, 5, 1]} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene;
