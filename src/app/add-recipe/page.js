"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function NewRecipePage() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("You must be signed in to add a recipe");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        ingredients,
        instructions,
        image_url,
        cuisine,
        user_id: user.id,
      }),
    });

    if (!res.ok) {
      alert("Failed to add recipe");
      setLoading(false);
      return;
    }

    router.push("/recipes");
  }

  return (
    <div className="min-h-screen px-6 pt-16 pb-20">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10">
          <p className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 mb-4">
            Share something delicious
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Add a Recipe
          </h1>

          <p className="text-gray-600 mt-3">
            Fill in the details below. Keep ingredients comma-separated and instructions as sentences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              placeholder="e.g. Chicken Tikka Masala"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Short description of your dish"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm min-h-[120px] focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10 outline-none"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <textarea
              placeholder="e.g. 500g chicken, 1 onion, 2 garlic cloves"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm min-h-[140px] focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10 outline-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Separate each ingredient with a comma
            </p>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <textarea
              placeholder="e.g. Fry the onion. Add the chicken. Simmer for 20 minutes."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm min-h-[160px] focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10 outline-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Write each step as a sentence
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              placeholder="Paste an image link"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10 outline-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Optional
            </p>
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <input
              placeholder="e.g. Italian, Indian"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/10 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6c47ff] hover:bg-[#5a3de0]"
            }`}
          >
            {loading ? "Adding recipe..." : "Add Recipe"}
          </button>

        </form>
      </div>
    </div>
  );
}