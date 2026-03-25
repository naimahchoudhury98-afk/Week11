export default function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "20px",
      borderTop: "1px solid #eaeaea",
      marginTop: "40px",
    }} role="contentinfo" aria-label="Site footer">
      <p>© {new Date().getFullYear()} Meal Planner & Recipes — Mahirah, Marisa, Naimah and Sarah</p>
    </footer>
  );
}