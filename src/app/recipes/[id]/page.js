import db from "@/lib/db";

export default async function RecipeDetailPage({ params }) {
  const id  = await params.id;

  const result = await db.query(
    "SELECT * FROM recipes WHERE id = $1",
    [id]
  );

  const recipe = result.rows[0];

  if (!recipe) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Recipe not found.
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-72 object-cover rounded-lg mb-8 shadow-sm"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {recipe.title}
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          {recipe.description}
        </p>

        {recipe.ingredients && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {recipe.ingredients.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {recipe.instructions && (
          <section>
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {recipe.instructions}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

