"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./components/project";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";

const projects = [
  {
    title: "Front-End Domination",
    src: "sheryhero.jpg",
    color: "#000000",
  },
  {
    title: "Back-End Domination",
    src: "undefined-backend_0.5x_Medium_wgHDU-5rPt.webp",
    color: "#8C8C8C",
  },
  {
    title: "Aptitude & Reasoning for Campus Placements.",
    src: "undefined-apti_reasoning_45vyAnZ4y.webp",
    color: "#EFE8D3",
  },
  {
    title: "Projects",
    src: "silencio.png",
    color: "#706D63",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
    >
      <div className={styles.body}>
        <h3>Courses Offered..</h3>
        <svg
          className={styles.svg}
          id="underline-svg"
          viewBox="0 0 271 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M268.783 18.599C123.253-1.529 2.459 13.367 1.262 13.521L.053 6.061c1.22-.155 123.176-15.227 270.02 5.089l-1.29 7.449z"
            fill="#23cfa6"
          />
        </svg>

        {projects.map((project, index) => {
          return (
            <Project index={index} title={project.title} manageModal={manageModal} key={index} />
          );
        })}
      </div>
      <Rounded>
        <p id="cc">More Courses</p>
      </Rounded>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <Image src={`/images/${src}`} width={300} height={0} alt="image" />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
    </main>
  );
}
