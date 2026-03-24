export default function SearchBar() {
  return (
    <form action="/search" method="GET">
      <label htmlFor="search">Search</label>
      <input type="search" id="search" name="q" placeholder="Search..." />
      <button type="submit">Go</button>
    </form>
  );
}
