import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Model from "./Model";
import Page1 from "../components/Aboutp1/page1";
import Page2 from "../components/Aboutp1/page2";
import Page3 from "../components/Aboutp1/page3";

import styles from "./about.module.scss";
import "./globals.css";
import * as THREE from "three";

export default function About() {
  const modelRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { width, height } = canvasRef.current.getBoundingClientRect();

      const x = (clientX / width) * 2 - 1;
      const y = -(clientY / height) * 2 + 1;

      if (modelRef.current) {
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          y * Math.PI * 0.1,
          0.1
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          x * Math.PI * 0.1,
          0.1
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <Page1 />
      <Page2 />
      <Page3 />
      <div className={styles.main}>
        <Canvas
          ref={canvasRef}
          className={styles.scene}
          camera={{ position: [0, 0, -1.2], fov: "90" }}
        >
          <ambientLight intensity={4} />
          <directionalLight intensity={1} position={[1, 0, 1]} />
          <directionalLight intensity={2} position={[-1, 0, 1]} />
          <directionalLight intensity={4} position={[4, -4, 8]} />

          <Model ref={modelRef} />

          <Environment background={false} files="/medias/modern-empty-room.jpg" />
        </Canvas>
      </div>
    </div>
  );
}
