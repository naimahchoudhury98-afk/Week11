import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const result = await pool.query(
      `SELECT meal_plan.*, recipes.title, recipes.image_url, recipes.cuisine 
       FROM meal_plan 
       JOIN recipes ON meal_plan.recipe_id = recipes.id 
       WHERE meal_plan.user_id = $1 
       ORDER BY meal_plan.created_at DESC`,
      [user_id]
    );
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { user_id, recipe_id, day_of_week, meal_type } = await request.json();
    const result = await pool.query(
      "INSERT INTO meal_plan (user_id, recipe_id, day_of_week, meal_type) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, recipe_id, day_of_week, meal_type]
    );
    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}