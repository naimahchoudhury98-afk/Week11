import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { clerk_id, username, avatar_url } = await request.json();
    const result = await pool.query(
      "INSERT INTO users (clerk_id, username, avatar_url) VALUES ($1, $2, $3) ON CONFLICT (clerk_id) DO NOTHING RETURNING *",
      [clerk_id, username, avatar_url]
    );
    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}