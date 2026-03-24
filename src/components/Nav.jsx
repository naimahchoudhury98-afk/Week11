import Link from "next/link";

export default function Nav() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <Link href="#">Home</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>

        <div className="navbar-right">
          <a href="#">Login</a>
        </div>

        <div className="scroll-box"></div>
      </nav>
    </>
  );
}
