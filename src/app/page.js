import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Plan your week with community-powered recipes
      </h1>

      <p className="text-gray-600 max-w-xl text-center mb-8">
        Browse recipes from home cooks everywhere and build your weekly meal plan.
      </p>

      <div className="flex gap-4">
        <a href="/sign-up" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Sign Up
        </a>
        <a href="/recipes" className="px-6 py-3 border border-gray-300 rounded-lg">
          Browse Recipes
        </a>
      </div>
    </main>

  );
}
