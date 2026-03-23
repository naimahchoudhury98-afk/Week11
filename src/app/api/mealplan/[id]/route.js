import pool from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM meal_plan WHERE id = $1", [id]);
    return Response.json({ message: "Meal removed from plan successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}