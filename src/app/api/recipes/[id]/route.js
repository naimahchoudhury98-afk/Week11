import pool from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM recipes WHERE id = $1", [id]);
    return Response.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await pool.query(
      "SELECT * FROM recipes WHERE id = $1", [id]
    );
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}