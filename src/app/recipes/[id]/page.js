"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState("Monday");
  const [mealType, setMealType] = useState("Breakfast");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      });
  }, [id]);

  async function handleAddToPlan() {
    if (!user) {
      alert("You must be signed in to add to your meal plan!");
      return;
    }

    await fetch("/api/mealplan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        recipe_id: parseInt(id),
        day_of_week: day,
        meal_type: mealType
      })
    });

    setShowModal(false);
    setAdded(true);
  }

  async function handleDeleteRecipe() {
    const confirmed = confirm("Are you sure you want to delete this recipe?");
    if (!confirmed) return;

    const res = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to delete recipe");
      return;
    }

    alert("Recipe deleted successfully");
    router.push("/recipes");
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!recipe) return <p className="text-center mt-20">Recipe not found.</p>;

  const isAuthor = user && recipe.user_id === user.id;

  return (
    <div className="min-h-screen px-6 pt-16 pb-20">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/recipes"
          className="inline-block mb-8 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
        >
          ← Back to Recipes
        </Link>

        {recipe.image_url && recipe.image_url.trim() !== "" && (
          <img
            src={recipe.image_url}
            alt={recipe.title || "Recipe image"}
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover rounded-[28px] mb-10 shadow-sm"
          />
        )}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">

          <div>
            <span className="inline-flex rounded-full bg-[#f4f0ff] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#6c47ff] mb-3">
              {recipe.cuisine || "Recipe"}
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-3">
              {recipe.title}
            </h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-[#6c47ff] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3de0] transition"
            >
              + Add to Plan
            </button>

            {isAuthor && (
              <button
                onClick={handleDeleteRecipe}
                className="rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {added && (
          <p className="text-green-600 font-medium mb-6">
            ✅ Added to your meal plan!
          </p>
        )}

        <p className="text-lg leading-8 text-gray-600 mb-12">
          {recipe.description}
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Ingredients
          </h2>

          <ul className="space-y-3">
            {recipe.ingredients.split(",").map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-[#6c47ff]" />
                {item.trim()}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Instructions
          </h2>

          <ol className="space-y-5">
            {recipe.instructions.split(".").map((step, index) => {
              let cleanStep = step.trim();
              if (!cleanStep) return null;

              cleanStep = cleanStep.replace(/^\d+\.?\s*/, "");

              return (
                <li key={index} className="flex gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6c47ff] text-white text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{cleanStep}</p>
                </li>
              );
            })}
          </ol>
        </section>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">
              Add to Meal Plan
            </h2>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 mb-4"
            >
              {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meal Type
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 mb-6"
            >
              {["Breakfast","Lunch","Dinner","Snack"].map(m => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleAddToPlan}
                className="flex-1 bg-[#6c47ff] text-white py-3 rounded-lg hover:bg-[#5a3de0] font-medium"
              >
                Add to Plan
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}