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
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/recipes" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Recipes
        </Link>

        {recipe.image_url && recipe.image_url.trim() !== "" && (
          <img
            src={recipe.image_url}
            alt={recipe.title || "Recipe image"}
            referrerPolicy="no-referrer"
            className="w-full h-72 object-cover rounded-lg mb-8 shadow-sm"
          />
        )}

        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
            <p className="text-sm text-gray-400 uppercase tracking-wide">{recipe.cuisine}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 whitespace-nowrap"
            >
              + Add to Plan
            </button>

            {isAuthor && (
              <button
                onClick={handleDeleteRecipe}
                className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 whitespace-nowrap"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {added && (
          <p className="text-green-600 font-medium mb-4">✅ Added to your meal plan!</p>
        )}

        <p className="text-gray-700 text-lg leading-relaxed mb-10">{recipe.description}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Ingredients
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {recipe.ingredients.split(",").map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Instructions
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            {recipe.instructions.split(".").map((step, index) => {
              let cleanStep = step.trim();

              if (!cleanStep) return null;

              cleanStep = cleanStep.replace(/^\d+\.?\s*/, "");

              return cleanStep ? <li key={index}>{cleanStep}</li> : null;
            })}
          </ol>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Add to Meal Plan</h2>

            <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full border p-3 rounded-lg mb-6"
            >
              {["Breakfast", "Lunch", "Dinner", "Snack"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleAddToPlan}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
              >
                Add to Plan
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}