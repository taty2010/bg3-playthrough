"use client";

import { useState } from "react";
import { addPlays, editPlays } from "../utils/supabaseRequest";
import { useAuth, useUser } from "@clerk/nextjs";
import { Dropdown, Input } from "../components/dropdown";

const backgrounds = [
  "Acolyte",
  "Charlatan",
  "Criminal",
  "Entertainer",
  "Folk Hero",
  "Guild Artisan",
  "Haunted One",
  "Noble",
  "Outlander",
  "Sage",
  "Soldier",
  "Urchin",
];

export default function Form({
  data,
  races,
  subClass,
  play,
  setPlays,
  edit,
  setEdit,
}) {
  const { userId } = useAuth();
  const { user } = useUser();
  const userName = user?.username;

  const [name, setName] = useState(play?.name || "Astarion");
  const [tavRace, setTavRace] = useState(races ? races[0].race : null);
  const [tavClass, setTavClass] = useState(subClass.data[0]?.main_class);

  const originNames = data?.filter((d) => d.origin == true).map((d) => d.name);
  const allNames = data?.map((d) => d.name);
  const raceList = races?.map((r) => r.race);
  const classList = subClass.data?.map((c) => c.main_class);

  const { classes, race, background, subrace } =
    data?.filter((d) => d.name === name)[0] || "";

  const sub = subClass.data?.filter(
    (c) =>
      c.main_class === (name === "Tav" || name === "Durge" ? tavClass : classes)
  );
  const subRaces = races?.filter((r) => r.race === tavRace);

  async function handleSubmit(event) {
    event.preventDefault();
    setEdit(!edit);
    const data = await addPlays({ userId, event, userName });
    setPlays(data);
  }

  async function handleEdit(event) {
    const id = play.id;
    setEdit(!edit.open);
    const data = await editPlays({ id, event, userId });
    setPlays(data);
  }

  return (
    <form
      className="formDashboard"
      onSubmit={edit.open ? handleEdit : handleSubmit}
    >
      <Dropdown
        label="Character"
        mapValues={originNames.concat(["Tav", "Durge"])}
        set={setName}
        defaultValue={name}
      />
      {name === "Tav" || name === "Durge" ? (
        <>
          <Dropdown label="Race" mapValues={raceList} set={setTavRace} />
          {subRaces && subRaces[0].subrace ? (
            <Dropdown label="Subrace" mapValues={subRaces[0]?.subrace} />
          ) : null}
          <Dropdown label="Class" mapValues={classList} set={setTavClass} />
        </>
      ) : (
        <>
          <Input label="Race" value={race} />
          <Input
            label="Subrace"
            value={subrace ? subrace : "None"}
            disabled={true}
          />
          <Input label="Class" value={classes} />
        </>
      )}
      <Dropdown
        label="Subclass"
        mapValues={sub[0]?.subclass}
        // defaultValue={play?.subclass}
      />
      <Dropdown
        label="Background"
        defaultValue={background}
        mapValues={backgrounds}
      />
      <Dropdown
        label="Romance"
        mapValues={allNames.concat("No")}
        defaultValue={play?.romance}
      />
      <label for="notes">Run Notes:</label>
      <textarea
        id="notes"
        name="notes"
        rows="5"
        cols="33"
        placeholder="Add important notes from your run"
      ></textarea>
      <Dropdown label="In Progress" mapValues={["No", "Yes"]} />
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}
