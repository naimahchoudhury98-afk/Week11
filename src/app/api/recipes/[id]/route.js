import pool from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      "SELECT id, title, description, ingredients, instructions, image_url, cuisine, user_id FROM recipes WHERE id = $1",
      [id]
    );

    if (!result.rows[0]) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "You must be signed in" }, { status: 401 });
    }

    const { id } = await params;

    const recipeResult = await pool.query(
      "SELECT user_id FROM recipes WHERE id = $1",
      [id]
    );

    const recipe = recipeResult.rows[0];

    if (!recipe) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe.user_id !== userId) {
      return Response.json(
        { error: "You can only delete your own recipe" },
        { status: 403 }
      );
    }

    await pool.query("DELETE FROM recipes WHERE id = $1", [id]);

    return Response.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}