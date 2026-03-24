"use client";

export default function AddRecipeForm() {
  return (
    <>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Ingredients (one per line)"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Steps (one per line)"
          className="w-full border p-3 rounded-lg"
        />

        <input type="file" className="w-full border p-3 rounded-lg" />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Publish Recipe
        </button>
      </form>
    </>
  );
}
