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
    <div className="min-h-screen px-6 pt-16 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 mb-4">
              Discover your next meal
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              All Recipes
            </h1>
            <p className="text-gray-600 mt-3 max-w-xl">
              Browse community recipes and find something good for the week ahead.
            </p>
          </div>

          <Link
            href="/add-recipe"
            className="inline-flex items-center justify-center rounded-full bg-[#6c47ff] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5a3de0] transition"
          >
            + Add a Recipe
          </Link>
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search recipes or cuisine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-gray-700 shadow-sm outline-none placeholder:text-gray-400 focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="group">
              <article className="h-full overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                {recipe.image_url && recipe.image_url.trim() !== "" ? (
                  <div className="overflow-hidden">
                    <img
                      src={recipe.image_url}
                      alt={recipe.title || "Recipe image"}
                      referrerPolicy="no-referrer"
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-orange-50 to-[#f4f0ff] text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-flex rounded-full bg-[#f4f0ff] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#6c47ff]">
                      {recipe.cuisine || "Recipe"}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-2 transition group-hover:text-[#6c47ff]">
                    {recipe.title}
                  </h2>

                  <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                    {recipe.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-14 rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-gray-100">
            <p className="text-lg font-medium text-gray-700">
              {`No recipes found for "${search}"`}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try a different recipe name or cuisine.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}