export default function AddRecipePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Add a Recipe</h1>

        <form className="space-y-4">
          <input type="text" placeholder="Title" className="w-full border p-3 rounded-lg" />
          <textarea placeholder="Description" className="w-full border p-3 rounded-lg" />

          <textarea placeholder="Ingredients (one per line)" className="w-full border p-3 rounded-lg" />

          <textarea placeholder="Steps (one per line)" className="w-full border p-3 rounded-lg" />

          <input type="file" className="w-full border p-3 rounded-lg" />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Publish Recipe
          </button>
        </form>
      </div>
    </main>
  );
}