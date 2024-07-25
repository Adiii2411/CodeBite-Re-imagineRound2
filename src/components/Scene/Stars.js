import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Stars = () => {
  const starsRef = useRef();
  const numStars = 900;

  useEffect(() => {
    const stars = [];
    const createStar = () => {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.005, 64, 32),
        new THREE.MeshStandardMaterial({
          color: 0xfafafa,
          emissive: 0xffffff,
          roughness: 0,
          metalness: 3,
          chromaticAberration: 0.07,
          transparent: true,
          opacity: 0.1,
        })
      );

      star.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 7, Math.random() * 11);

      star.userData.lifespan = Math.random() * 2 + 1;
      star.userData.age = 0;

      return star;
    };

    for (let i = 0; i < numStars; i++) {
      stars.push(createStar());
    }

    starsRef.current.add(...stars);

    return () => {
      stars.forEach((star) => starsRef.current.remove(star));
    };
  }, [numStars]);

  useFrame((state, delta) => {
    starsRef.current.children.forEach((star) => {
      star.userData.age += delta;

      if (star.userData.age > star.userData.lifespan) {
        star.material.opacity -= delta;
        if (star.material.opacity <= 0) {
          star.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
          );
          star.material.opacity = 1;
          star.userData.age = 0;
          star.userData.lifespan = Math.random() * 2 + 1;
        }
      }
    });
  });

  return <group ref={starsRef}></group>;
};

export default Stars;
