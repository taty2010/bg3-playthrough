import { SignIn } from "@clerk/nextjs";

export default async function Home() {
  return (
    <main>
      <SignIn />
    </main>
  );
}
