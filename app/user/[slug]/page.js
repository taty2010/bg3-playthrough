import { createClerkSupabaseClient } from "../../../utils/supabase/server";
import Card from "../../dashboard/components/card";
import styles from "./page.module.css";

export default async function Page({ params }) {
  const client = await createClerkSupabaseClient();
  const { data, error } = await client
    .from("plays")
    .select("*")
    .eq("user_name", params.slug);

  return (
    <main id={styles.dashboard} className="main_dashboard">
      <header>
        <h1>{params.slug}'s Playthroughs</h1>
      </header>
      <Card plays={data} />
    </main>
  );
}
