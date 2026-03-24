import AddRecipeForm from "@/components/AddRecipeForm";

export default function AddRecipePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Add a Recipe</h1>
        <AddRecipeForm />
      </div>
    </main>
  );
}
