"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { img1, img2, img3, img4, img5, img6, img7, img8 } from "../data";

export default function Gallery() {
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

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <div onMouseMove={(e) => manageMouseMove(e)} className={styles.gallery}>
      <div ref={plane1} className={styles.plane}>
        <Image src={img1} alt="image" width={300} />
        <Image src={img2} alt="image" width={300} />
        <Image src={img7} alt="image" width={225} />
      </div>
      <div ref={plane2} className={styles.plane}>
        <Image src={img4} alt="image" width={250} />
        <Image src={img6} alt="image" width={200} />
        <Image src={img8} alt="image" width={225} />
      </div>
      <div ref={plane3} className={styles.plane}>
        <Image src={img3} alt="image" width={150} />
        <Image src={img5} alt="image" width={200} />
      </div>
      <div className={styles.title}>
        <p>
          Hover to Feel the <span>Vibe</span>
        </p>
        <svg
          className={styles.svg}
          id="circle-svg"
          viewBox="0 0 204 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M99.207 80c-1.618 0-3.23-.01-4.848-.031-40.408-.545-71.663-7.373-85.745-18.722C1.7 55.67-1.072 49.096.37 41.713c3.59-18.41 32.74-30.259 86.638-35.212 3.785-.348 7.56-.65 11.304-.909-31.939-3.13-57.879-2.15-64.14.701l-1.489-3.349C40.83-.762 71.798-1 103.187 2.405c5.834.634 11.319 1.34 16.47 2.098 25.986-.888 46.149-.083 46.431-.073l-.149 3.666c-.205-.01-11.308-.452-27.578-.317 29.674 6.106 44.798 14.003 51.855 18.92 9.619 6.708 14.246 14.402 13.748 22.876-.38 6.412-5.937 12.082-16.527 16.853-18.534 8.344-52.769 13.567-88.23 13.572zm20.147-71.816c-10.092.353-21.051.96-32.047 1.973C35.961 14.882 7.13 26.04 3.935 42.42c-1.176 6.018 1.099 11.236 6.943 15.95 13.266 10.696 44.49 17.399 83.527 17.923 36.679.493 72.618-4.694 91.553-13.224 6.358-2.866 14.015-7.57 14.375-13.717.416-7.103-3.683-13.707-12.182-19.637-13.276-9.247-37.855-16.884-68.797-21.53z"
            fill="#00EB8F"
          />
        </svg>
      </div>
    </div>
  );
}
