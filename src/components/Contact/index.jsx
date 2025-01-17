import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring, px } from "framer-motion";
import Magnetic from "../../common/Magnetic";

export default function Headersindex() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image width={200} height={200} alt={"image"} src={`/images/favicon.png`} />
            </div>
            <h2>Sheryians</h2>
          </span>
          <h2>Coding School</h2>
      

          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#23cfa6"} className={styles.button}>
              <p>Sign In</p>
            </Rounded>
          </motion.div>
          <motion.svg className={styles.svg}
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>HELLO@SHERYIANS.COM</p>
          </Rounded>
          <Rounded>
            <p>+91-8109161752</p>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3>CodeBite</h3>
              <p>Re-Imagine © Edition</p>
            </span>
            <span>
              <h3>Version</h3>
              <p>Code_Bite_2.1</p>
            </span>
          </div>
          <div>
            <span>
              <h3>Socials</h3>
              <Magnetic>
                <p>Youtube</p>
              </Magnetic>
            </span>
            <Magnetic>
              <p>Instagram</p>
            </Magnetic>
            <Magnetic>
              <p>Discord</p>
            </Magnetic>
            <Magnetic>
              <p>Linkedin</p>
            </Magnetic>
            <Magnetic>
              <p>Telegram</p>
            </Magnetic>
            <Magnetic>
              <p>Facebook</p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
