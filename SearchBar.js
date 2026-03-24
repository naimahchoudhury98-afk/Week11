export default function SearchBar() {
  return (
    <form action="/search" method="GET" role="search" aria-label="Site search">
      <label htmlFor="search">Search the site</label>
      
      <input
        type="search"
        id="search"
        name="q"
        placeholder="Search..."
        aria-label="Search input"
        aria-describedby="search-help"
      />
      
      <span id="search-help">
        Enter keywords and press search
      </span>
      
      <button type="submit" aria-label="Submit search">
        Go
      </button>
    </form>
  );
}
