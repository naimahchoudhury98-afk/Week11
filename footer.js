export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © {new Date().getFullYear()} 2026 Meal Planner & Recipes Website Created By
        Mahirah, Marisa, Naimah and Sarah{" "}
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
