import Link from "next/link";
import db from "@/lib/db";

export default async function RecipesPage() {
  const result = await db.query("SELECT * FROM recipes ORDER BY id ASC");
  const recipes = result.rows;

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">
          All Recipes
        </h1>

        {recipes.length === 0 && (
          <p className="text-gray-600">No recipes found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="block border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">

                <img src={recipe.img_url} alt={recipe.title} className="w-full h-48 object-cover" />

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {recipe.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3">
                {recipe.description}
                </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}