import db from "@/lib/db";


export default async function RecipesPage() {
    const recipes = (await db.query(`SELECT * FROM recipes`)).rows

    return (
      <main className="min-h-screen bg-white px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition" >
                <img src={recipe.img_url} alt={recipe.title} className="h-40 w-full object-cover rounded mb-3" />
                <h2 className="font-semibold text-lg">{recipe.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                <p className="text-xs text-gray-500 mt-2">{recipe.cuisine}</p>
                <a href={`/recipes/${recipe.id}`} className="inline-block mt-4 text-blue-600 font-medium" >View Recipe ➡️</a>
            </div>
        ))}
      </div>
    </main>
  );
}