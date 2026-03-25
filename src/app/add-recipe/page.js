"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function NewRecipePage() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [cuisine, setCuisine] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert ("You must be signed in to add a recipe");
      return;
    }

    await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        ingredients,
        instructions,
        image_url,
        cuisine,
        user_id: user.id
      })
    });
    alert("Recipe added! 🎉");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Add a Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="w-full border p-3 rounded"/>
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="w-full border p-3 rounded"/>
        <textarea placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)} className="w-full border p-3 rounded"/>
        <textarea placeholder="Instructions" onChange={(e) => setInstructions(e.target.value)} className="w-full border p-3 rounded"/>
        <input placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)} className="w-full border p-3 rounded"/>
        <input placeholder="Cuisine" onChange={(e) => setCuisine(e.target.value)} className="w-full border p-3 rounded"/>
        <button type="submit" className="w-full bg-[#6c47ff] text-white rounded-lg font-medium hover:bg-[#5a3de0] transition">Add Recipe</button>
      </form>
      </div>
    </main>
  );
}