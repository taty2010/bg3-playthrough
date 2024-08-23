import { SignUp } from "@clerk/nextjs";

export default async function Home() {
  return (
    <main>
      <SignUp />
    </main>
  );
}
