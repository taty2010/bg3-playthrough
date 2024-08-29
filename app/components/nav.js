import Link from "next/link";
import { UserButton, userButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Nav = () => {
  return (
    <nav>
      <Link href="/"> Home </Link>
      <SignedIn>
        <div className="nav">
          <Link href="/dashboard"> Dashboard</Link>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="nav">
          <Link href="/login">Sign In</Link>
        </div>
      </SignedOut>
    </nav>
  );
};

export default Nav;
