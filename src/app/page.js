"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">
        Plan your week with community-powered recipes
      </h1>

      <p className="text-gray-600 max-w-xl text-center mb-8">
        Browse recipes from home cooks everywhere and build your weekly meal plan.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {isSignedIn ? (
          <>
            <Link href="/meal-plan" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              My Meal Plan
            </Link>
            <Link href="/recipes" className="px-6 py-3 border border-gray-300 rounded-lg">
              Browse Recipes
            </Link>
            <Link href="/add-recipe" className="px-6 py-3 bg-green-600 text-white rounded-lg">
              Add a Recipe
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign-up" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Sign Up
            </Link>
            <Link href="/sign-in" className="px-6 py-3 border border-gray-300 rounded-lg">
              Sign In
            </Link>
            <Link href="/recipes" className="px-6 py-3 bg-green-600 text-white rounded-lg">
              Browse Recipes
            </Link>
          </>
        )}
      </div>
    </main>
  );
}