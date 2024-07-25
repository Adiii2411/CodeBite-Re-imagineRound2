"use client";
import { useRef, useEffect } from "react";
import styles from "./MaskPage.module.css";

export default function MaskPage() {
  const container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = 0.8;
  const targetMaskSize = 170;
  const easing = 1;
  let easedScrollProgress = 0;

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 120 + "%";
    requestAnimationFrame(animate);
  };

  const getScrollProgress = () => {
    const scrollProgress =
      stickyMask.current.offsetTop /
      (container.current.getBoundingClientRect().height - window.innerHeight);
    const delta = scrollProgress - easedScrollProgress;
    easedScrollProgress += delta * easing;
    return easedScrollProgress;
  };

  return (
    <div className={styles.mask}>
      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
        <video src="https://ik.imagekit.io/sheryians/About%20Us/Webreel1_1_Y25mvxPxf.mp4?updatedAt=1710514764579" autoplay muted playsinline loop></video>
        </div>
      </div>
    </div>
  );
}
