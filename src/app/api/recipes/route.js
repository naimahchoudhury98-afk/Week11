import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM recipes ORDER BY created_at DESC"
    );
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      image_url,
      cuisine,
      user_id,
    } = await request.json();

    const cleanImageUrl = image_url?.trim() || null;

    const result = await pool.query(
      "INSERT INTO recipes (title, description, ingredients, instructions, image_url, cuisine, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, ingredients, instructions, cleanImageUrl, cuisine, user_id]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}