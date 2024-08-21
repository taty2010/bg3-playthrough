"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Card from "../components/card";
import Form from "../components/Form";

export default function Plays({ data, subClass, playData }) {
  const { userId } = useAuth();
  const [plays, setPlays] = useState(playData?.data);
  const [edit, setEdit] = useState({
    open: false,
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

  return (
    <>
      <Form
        data={data}
        playData={playData}
        subClass={subClass}
        setPlays={setPlays}
        edit={edit}
        setEdit={setEdit}
      />
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
    </>
  );
}
