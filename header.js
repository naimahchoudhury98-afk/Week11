export default function Header() {
  return (
    <header role="banner" aria-label="Site header">
      <nav role="navigation" aria-label="Main navigation">
        <div>
          <h1>Meal Planner & Recipe Website</h1>
        </div>
        <ul role="menubar">
          <li role="none">
            <a href="/" role="menuitem" aria-label="Go to home page">
              Home
            </a>
          </li>
          <li role="none">
            <a href="/about" role="menuitem" aria-label="Go to about page">
              About
            </a>
          </li>
          <li role="none">
            <a href="/contact" role="menuitem" aria-label="Go to contact page">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
