import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        <div className="navbar-right">
          <Show when={"signed-in"}>
            <UserButton />
          </Show>
          <Show when={"signed-out"}>
            <SignInButton />
          </Show>
        </div>

        <div className="scroll-box"></div>
      </nav>
    </>
  );
}
