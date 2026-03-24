export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer">
      <p aria-live="polite">
        © {new Date().getFullYear()} Meal Planner & Recipes Website Created By
        Mahirah, Marisa, Naimah and Sarah
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #eaeaea",
    marginTop: "40px",
  },
};
