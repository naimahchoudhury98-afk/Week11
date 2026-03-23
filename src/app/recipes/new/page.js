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
    <main>
      <h1>Add a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <textarea placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)} />
        <textarea placeholder="Instructions" onChange={(e) => setInstructions(e.target.value)} />
        <input placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)} />
        <input placeholder="Cuisine" onChange={(e) => setCuisine(e.target.value)} />
        <button type="submit">Add Recipe</button>
      </form>
    </main>
  );
}