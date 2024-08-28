import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClient } from "../../utils/supabase/server";
import Plays from "./utils/Plays";
import styles from "./page.module.css";

export default async function Dashboard() {
  const client = await createClerkSupabaseClient();
  const { userId } = auth();
  const { data, error } = await client.from("bg3").select("*");

  const getSubClass = async () => {
    const { data, error } = await client.from("classes").select("*");
    return { data, error };
  };

  const getPlays = async () => {
    const { data, error } = await client
      .from("plays")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.log({ error });
    }
    return data;
  };

  const getRaces = async () => {
    const { data, error } = await client.from("races").select("*");

    if (error) {
      console.log(error);
    }

    return data;
  };

  const subClass = await getSubClass();
  const test = await getPlays();
  const races = await getRaces();

  return (
    <main id={styles.dashboard} className="main_dashboard">
      <Plays
        data={data}
        playData={test}
        userId={userId}
        subClass={subClass}
        races={races}
      />
    </main>
  );
}
