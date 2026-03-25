"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const filtered = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) ||
    recipe.cuisine?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
          <Link
            href="/add-recipe"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            + Add a Recipe
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search recipes or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-8 text-gray-700"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer">

                {/* 🔥 IMAGE FIX */}
                {recipe.image_url && recipe.image_url.trim() !== "" ? (
                  <img
                    src={recipe.image_url}
                    alt={recipe.title || "Recipe image"}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {recipe.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {recipe.cuisine}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            {`No recipes found for "${search}"`}
          </p>
        )}

      </div>
    </main>
  );
}