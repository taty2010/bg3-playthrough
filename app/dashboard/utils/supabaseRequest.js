import { getSupabase } from "../../../utils/supabase/client";

const client = getSupabase();

const getFormValues = (event, userName) => {
  const target = event.target;
  return {
    char_type: "origin",
    name: target[0].value,
    romance: target[5].value,
    race: target[1].value,
    class: target[2].value,
    subclass: target[3].value,
    in_progress: target[6].value,
    background: target[4].value,
    user_name: userName,
  };
};

export const addPlays = async ({ userId, event, userName }) => {
  const values = getFormValues(event, userName);

  const { error } = await client.from("plays").insert({
    ...values,
    user_id: userId,
  });
  if (error) {
    console.log(error);
  }
  const data = await getPlays(userId);
  return data;
};

export const getPlays = async (userId) => {
  const { data, error } = await client
    .from("plays")
    .select("*")
    .eq("user_id", userId);
  return data;
};

export const deletePlays = async ({ id, userId }) => {
  const { error } = await client.from("plays").delete().eq("id", id);
  if (error) console.log({ error });
  const data = await getPlays(userId);
  return data;
};

export const editPlays = async ({ id, event, userId }) => {
  const values = getFormValues(event);
  const { error } = await client
    .from("plays")
    .update({
      ...values,
      user_id: userId,
    })
    .eq("id", id);

  if (error) console.log({ error });
  const data = await getPlays(userId);
  return data;
};
