import styles from "./page.module.css";

export default async function Home() {
  const icons = ["astarion", "gale", "karlach", "wyll", "shadowheart"];

  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        <img src={`../${icons[randomNum(5)]}.png`} />
      </div>
    </div>
  );
}
