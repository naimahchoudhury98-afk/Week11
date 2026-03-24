import db from "@/lib/db";

export default async function RecipeDetailPage({ params }) {
    console.log("IS PROMISE:", params instanceof Promise);
  console.log("PARAMS:", params);
  console.log("CALL STACK:", new Error().stack); 

  const id = params.id;

  const result = await db.query(
    "SELECT * FROM recipes WHERE id = $1",
    [id]
  );

  const recipe = result.rows[0];

  if (!recipe) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          Recipe not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <img
          src={recipe.img_url}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-6"
        />

        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

        <p className="text-gray-700 mb-6">{recipe.description}</p>

        <div className="text-sm text-gray-500 mb-8">
          <p>Cuisine: {recipe.cuisine}</p>
          <p>
            Posted on:{" "}
            {new Date(recipe.created_at).toLocaleDateString()}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          {recipe.ingredients?.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Instructions</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          {recipe.instructions?.split("\n").map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </main>
  );
}