"use client";

import styles from "../page.module.css";
import Details from "./details";
import MoreDetails from "./moreDetails";
import { useState } from "react";

const Playthrough = ({ play }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { origin_icon, id, char_class, race, tav_name, origin_char } = play;

  const playthrough = id?.title[0]?.plain_text;
  const originIcon = origin_icon?.formula.string || "/logo.webp";
  const char_race = race?.select?.name;
  const name = origin_char?.select?.name || tav_name?.rich_text[0]?.plain_text;
  const classes = char_class?.multi_select[0]?.name;

  return (
    <>
      <div className={styles.card}>
        <span>{playthrough}</span>
        <div>
          <img className={styles.icon} alt={name} src={originIcon} />
          <div className={styles.desc}>
            <p>{name}</p>
            <p>{char_race}</p>
            <p>{classes}</p>
          </div>
        </div>
        <MoreDetails
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </div>
      <Details play={play} showDetails={showDetails} />
    </>
  );
};

export default Playthrough;
