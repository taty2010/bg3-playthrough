import { createClerkSupabaseClient } from "../../../utils/supabase/server";
import styles from "./page.module.css";
import Plays from "@/app/dashboard/utils/Plays";

export default async function Page({ params }) {
  const client = await createClerkSupabaseClient();
  const { data, error } = await client
    .from("plays")
    .select("*")
    .eq("user_name", params.slug);

  return (
    <main id={styles.dashboard} className="main_dashboard">
      <Plays playData={data} userProfile={params.slug} />
    </main>
  );
}
