import React, { forwardRef, useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial, TextureLoader } from "three";

const Model = forwardRef((props, ref) => {
  const { scene } = useGLTF("/medias/new4.glb");
  const textureLoader = new TextureLoader();

  const agRef = useRef();
  const dhRef = useRef();
  const HtRef = useRef();

  const texturePaths = {
    BG_image002: "/images/harshBhaiya.jpg",
    BG_image003: "/images/adarshBhaiya.jpg",
    BG_image004: "/images/dhaneshBhaiya.jpg",
  };

  const findNodeByName = (root, name) => {
    if (root.name === name) return root;
    if (root.children) {
      for (let child of root.children) {
        const result = findNodeByName(child, name);
        if (result) return result;
      }
    }
    return null;
  };

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        const material = new MeshStandardMaterial({
          roughness: 0,
          metalness: 1,
          transparent: true,
          thickness: 2,
          roughness: 5,
          opacity: 0.6,
          noise: 2,
          side: THREE.DoubleSide,
        });

        if (texturePaths[node.name]) {
          textureLoader.load(texturePaths[node.name], (loadedTexture) => {
            material.map = loadedTexture;
            material.needsUpdate = true;
          });
        }

        node.material = material;

        if (["ag", "dh", "Ht"].includes(node.name)) {
          node.material = new MeshStandardMaterial({
            color: 0x909090,
            roughness: 0.2,
            metalness: 1,
            transparent: false,
            opacity: 1,
            backside: false,
          });
        }
      }
    });

    agRef.current = findNodeByName(scene, "ag");
    dhRef.current = findNodeByName(scene, "dh");
    HtRef.current = findNodeByName(scene, "Ht");
  }, [scene, textureLoader, texturePaths]);

  useFrame(() => {
    if (agRef.current) {
      agRef.current.rotation.z += 0.02;
    }
    if (dhRef.current) {
      dhRef.current.rotation.z += 0.02;
    }
    if (HtRef.current) {
      HtRef.current.rotation.z += 0.02;
    }
  });

  return <primitive object={scene} ref={ref} {...props} />;
});

useGLTF.preload("/medias/new4.glb");

export default Model;
