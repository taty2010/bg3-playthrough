"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Card from "../components/card";
import Form from "../components/Form";
import Modal from "../../dashboard/components/modal";

export default function Plays({ data, subClass, playData }) {
  const { userId } = useAuth();
  const { user } = useUser();

  const [plays, setPlays] = useState(playData?.data);
  const [edit, setEdit] = useState({
    open: false,
    id: null,
  });
  const [openForm, setOpenForm] = useState(false);

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

  const icons = ["astarion", "gale", "karlach", "wyll", "shadowheart"];

  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <>
      <header>
        <h1>{user?.username}'s Playthroughs</h1>
      </header>
      <Card
        plays={plays}
        formData={data}
        setPlays={setPlays}
        userId={userId}
        edit={edit}
        setEdit={setEdit}
        playData={playData}
        subClass={subClass}
      />
      <div className="addCard_wrapper">
        <div className="addCard" onClick={() => setOpenForm(!openForm)}>
          <span>+</span>
        </div>
        {openForm ? (
          <Modal edit={openForm} setEdit={setOpenForm}>
            <Form
              data={data}
              playData={playData}
              subClass={subClass}
              setPlays={setPlays}
              edit={openForm}
              setEdit={setOpenForm}
            />
          </Modal>
        ) : null}
      </div>
    </>
  );
}
