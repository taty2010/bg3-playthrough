import styles from "../page.module.css";

export default function Modal({ children, edit, setEdit }) {
  return (
    <div className={styles.modal}>
      <div className={styles.innerModal}>
        <button className={styles.modalClose} onClick={() => setEdit(!edit)}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
