import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClient } from "../../utils/supabase/server";
import Plays from "./utils/Plays";
import styles from "./page.module.css";
const client = await createClerkSupabaseClient();

const getPlays = async () => {
  const { userId } = auth();

  const { data, error } = await client
    .from("plays")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

const getSubClass = async () => {
  const { data, error } = await client.from("classes").select("*");
  return { data, error };
};

export default async function Dashboard() {
  const { userId } = auth();
  const { data, error } = await client.from("bg3").select("*");
  const subClass = await getSubClass();

  const test = await getPlays();

  return (
    <main id={styles.dashboard}>
      <Plays data={data} playData={test} userId={userId} subClass={subClass} />
    </main>
  );
}
