import Link from "next/link";
import Nav from "./Nav";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header>
      <div>
        <h1>Meal Planner & Recipe Website</h1>
      </div>
      <Nav />
      <SearchBar />
    </header>
  );
}
