import styles from "./style.module.scss";

export default function index() {
  return (
    <div className={styles.footer}>
      <a className={styles.link}>Youtube</a>
      <a className={styles.link}>Instagram</a>
      <a className={styles.link}>Facebook</a>
      <a className={styles.link}>LinkedIn</a>
    </div>
  );
}
