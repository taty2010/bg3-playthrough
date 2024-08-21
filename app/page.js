import styles from "./page.module.css";

export default async function Home() {
  const icons = ["astarion", "gale", "karlach", "wyll", "shadowheart"];

  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <main className={styles.wrapper}>
      <div className="icons home">
        <img src={`../${icons[randomNum(5)]}.png`} />
      </div>
    </main>
  );
}
