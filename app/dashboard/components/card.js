import styles from "../page.module.css";
import { deletePlays } from "../utils/supabaseRequest";
import Form from "../components/Form";
import Modal from "./modal";

export default function Card({
  plays,
  formData,
  setPlays,
  userId,
  edit,
  setEdit,
  subClass,
  expandCard,
  setExpandCard,
}) {
  const handleDelete = async (play) => {
    const id = play.id;
    const data = await deletePlays({ id, userId });
    setPlays(data);
  };

  return (
    <div className={styles.cardWrapper}>
      {plays?.map((play, i) => (
        <>
          <div
            className={`${styles.card} ${
              expandCard.expand && expandCard.id === i ? styles.expand : ""
            }`}
            key={play.created_at}
          >
            <>
              <div className={styles.charIcons}>
                <img
                  src={`/${play.name.replace("'", "").toLowerCase()}.png`}
                  alt={play.name}
                />
                {play.romance && play.romance !== "No" && (
                  <>
                    <img
                      className={styles.heart}
                      src="/heart.png"
                      alt="heart"
                    />
                    <img
                      src={`/${play.romance
                        .replace("'", "")
                        .toLowerCase()}.png`}
                      alt={play.name}
                    />
                  </>
                )}
              </div>
              <div className={styles.cardChar}>
                {/* <span>{i + 1}</span> */}
                {play.char_type === "origin" && (
                  <h3> {play.name} Origin Run</h3>
                )}
              </div>
              <ul>
                <li>
                  <span>Race: </span>
                  {play.race}
                </li>
                <li>
                  <span>Class: </span> {play.class}
                </li>
                <li>
                  <span>Subclass: </span>
                  {play.subclass}
                </li>
                {expandCard.expand && expandCard.id === i ? (
                  <>
                    <li>
                      <span>Background:</span> {play.background}
                    </li>
                    <li>
                      <span>Run Notes:</span>
                      {play.notes}
                    </li>
                  </>
                ) : null}
              </ul>
              {play.in_progress ? (
                <i className={styles.progress} id={styles.inProgress}>
                  In Progress
                </i>
              ) : (
                <i className={styles.progress} id={styles.completed}>
                  Completed
                </i>
              )}
            </>
            {userId ? (
              <div className={styles.edit}>
                <button onClick={() => setEdit({ open: !edit?.open, id: i })}>
                  ✐
                </button>
                <button
                  onClick={() =>
                    setExpandCard({ expand: !expandCard.expand, id: i })
                  }
                  title="View More"
                >
                  {expandCard.expand && expandCard.id === i ? "x" : "↔"}
                </button>
              </div>
            ) : null}
          </div>
          {edit?.open && edit?.id === i ? (
            <Modal edit={edit} setEdit={setEdit}>
              <Form
                data={formData}
                subClass={subClass}
                play={play}
                edit={edit}
                setEdit={setEdit}
                setPlays={setPlays}
              />
              <button
                className={styles.delete}
                onClick={() => handleDelete(play)}
              >
                Delete Playthrough
              </button>
            </Modal>
          ) : null}
        </>
      ))}
    </div>
  );
}
