import React, { useRef, useEffect } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Stars from "./Stars";

export default function Model() {
  const { nodes } = useGLTF("/medias/torrus.glb");
  const { viewport } = useThree();
  const torus = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    mouse.current.x = event.clientX / window.innerWidth - 0.5;
    mouse.current.y = event.clientY / window.innerHeight - 0.5;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x += 0.03;
      torus.current.rotation.z += 0.02;

      // torus.current.rotation.y = mouse.current.y * Math.PI * 0.6;
    }
  });

  const materialProps = {
    thickness: 0.4,
    roughness: 0,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.07,
    backside: false,
  };

  return (
    <group>
      <Stars />
      <Text
        scale={viewport.width / 4.5}
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -1]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Sheryians Coding School
      </Text>
      <mesh ref={torus} {...nodes.Torus002} scale={viewport.height / 2}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
