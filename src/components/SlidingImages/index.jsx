import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  {
    color: "#d6d7dc",
    src: "hqdefault (1).jpg",
  },
  {
    color: "#e3e5e7",
    src: "hqdefault.jpg",
  },
  {
    color: "#e3e3e3",
    src: "hqdefault (2).jpg",
  },
  {
    color: "#21242b",
    src: "hqdefault (3).jpg",
  },
  {
    color: "#e3e5e7",
    src: "hqdefault (9).jpg",
  },
  {
    color: "#d6d7dc",
    src: "hqdefault (10).jpg",
  },
  {
    color: "#e3e3e3",
    src: "hqdefault (11).jpg",
  },
  {
    color: "#21242b",
    src: "hqdefault (12).jpg",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "hqdefault (4).jpg",
  },
  {
    color: "#e5e0e1",
    src: "hqdefault (6).jpg",
  },
  {
    color: "#d7d4cf",
    src: "hqdefault (7).jpg",
  },
  {
    color: "#e1dad6",
    src: "hqdefault (8).jpg",
  },
  {
    color: "#d4e3ec",
    src: "hqdefault (13).jpg",
  },
  {
    color: "#e5e0e1",
    src: "hqdefault (14).jpg",
  },
  {
    color: "#d7d4cf",
    src: "hqdefault (15).jpg",
  },
  {
    color: "#e1dad6",
    src: "hqdefault (8).jpg",
  },
];

export default function index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 550]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -550]);
  const height = useTransform(scrollYProgress, [0, 0.8], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <div>
        <h1 className={styles.h1}>Subscribe us on Youtube</h1>
      </div>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => {
          return (
            <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
              <div className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={`/images/${project.src}`} />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => {
          return (
            <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
              <div key={index} className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={`/images/${project.src}`} />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
