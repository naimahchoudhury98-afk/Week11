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
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Add a Recipe</h1>
        <p className="text-gray-500 mb-8">
          Fill in the details below. Use commas for ingredients and full stops for each instruction step.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              placeholder="e.g. Chicken Tikka Masala"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="e.g. Creamy, spiced chicken curry with a rich tomato sauce"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-700 min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <textarea
              placeholder="e.g. 500g chicken, 1 onion, 2 garlic cloves, 400ml coconut milk"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-700 min-h-[140px]"
            />
            <p className="text-sm text-gray-500 mt-2">
              Separate each ingredient with a comma.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <textarea
              placeholder="e.g. Fry the onion. Add the chicken. Stir in the sauce. Simmer for 20 minutes."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-700 min-h-[160px]"
            />
            <p className="text-sm text-gray-500 mt-2">
              Write each step as a sentence ending with a full stop.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              placeholder="Paste an image link here"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-700"
            />
            <p className="text-sm text-gray-500 mt-2">
              Optional
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <input
              placeholder="e.g. Indian, Italian, Mexican"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6c47ff] hover:bg-[#5a3de0]"
            }`}
          >
            {loading ? "Adding recipe..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </main>
  );
}