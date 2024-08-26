"use client";

import { useState } from "react";
import { addPlays, editPlays } from "../utils/supabaseRequest";
import { useAuth, useUser } from "@clerk/nextjs";
import { Dropdown, Input } from "../components/dropdown";

export default function Form({
  data,
  playData,
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

  const allNames = [];
  const originNames = [];

  data
    ?.filter((d) => d.origin == true)
    .forEach((d) => {
      originNames.push(d.name);
    });

  data?.forEach((d) => {
    allNames.push(d.name);
  });

  const { classes, race, background } =
    data?.filter((d) => d.name === name)[0] || "";

  const sub = subClass.data?.filter((c) => c.main_class === classes);

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
        mapValues={originNames.concat("Tav")}
        set={setName}
        defaultValue={play?.name}
      />
      <Input label="Race" value={race} disabled={true} />
      <Input label="Class" value={classes} disabled={true} />
      <Dropdown
        label="Subclass"
        mapValues={sub[0]?.subclass}
        defaultValue={play?.subclass}
      />
      <Input label="Background" value={background} disabled={true} />
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
