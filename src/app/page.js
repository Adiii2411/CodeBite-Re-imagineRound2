"use client";
import stylesScss from "./page.module.scss";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Description from "../components/Description";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
import Gallery from "@/components/Gallery/Gallery";
import MusicPlayer from "./Music";

import gsap from "gsap";
import Text from "@/components/Text";
import Scene1 from "@/components/Scene1";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: true,
});

const MaskPage = dynamic(() => import("../components/MaskPage"), {
  ssr: true,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) => start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
    gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <main className={stylesScss.main}>
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      <MusicPlayer src="/medias/BG5.mp3" />
      <Scene />
      <Landing />
      <Description />
      <Projects />
      <Gallery />
      <div className="flex w-full h-screen items-center justify-center">
        <Text />
        <Scene1 />
      </div>
      <MaskPage />
      <SlidingImages />
      <Contact />
    </main>
  );
}
