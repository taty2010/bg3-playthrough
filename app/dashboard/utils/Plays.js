"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Card from "../components/card";
import Form from "../components/Form";
import Modal from "../../dashboard/components/modal";

export default function Plays({ data, subClass, playData, races }) {
  const { userId } = useAuth();
  const { user } = useUser();

  const [plays, setPlays] = useState(playData);
  const [edit, setEdit] = useState({
    open: false,
    id: null,
  });
  const [openForm, setOpenForm] = useState(false);
  const [expandCard, setExpandCard] = useState({
    expand: false,
    id: null,
  });

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

  const completed = playData.filter((d) => !d.in_progress);
  return (
    <>
      <header>
        {user?.imageUrl ? (
          <img src={user?.imageUrl} alt="profile picture" />
        ) : null}
        <h1>{user?.username}'s Playthroughs</h1>
        <div className="stats">
          <div>
            <h2>{playData.length}</h2>
            <span>Runs</span>
          </div>
          <div>
            <h2>{completed.length}</h2>
            <span>Completed</span>
          </div>
          <div>
            <h2>{playData.length - completed.length}</h2>
            <span>Ongoing</span>
          </div>
        </div>
      </header>
      <Card
        plays={plays}
        formData={data}
        setPlays={setPlays}
        userId={userId}
        edit={edit}
        setEdit={setEdit}
        subClass={subClass}
        setExpandCard={setExpandCard}
        expandCard={expandCard}
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
              races={races}
            />
          </Modal>
        ) : null}
      </div>
    </>
  );
}
