"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerk_id: user.id,
        username: user.username || user.firstName || user.emailAddresses[0].emailAddress,
        avatar_url: user.imageUrl
      })
    });
  }, [isSignedIn, user]);

  return (
    <div className="min-h-screen px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <section className="max-w-6xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 mb-6">
              Simple meal planning for everyday life
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.05] mb-6">
              Make meal planning
              <span className="block text-[#6c47ff]">feel effortless</span>
            </h1>

            <p className="text-lg leading-8 text-gray-600 max-w-xl mb-8">
              Discover recipes, organise your week, and keep everything in one
              calm, easy place.
            </p>

            <div className="flex flex-wrap gap-4">
              {isSignedIn ? (
                <>
                  <Link
                    href="/meal-plan"
                    className="inline-flex items-center justify-center rounded-full bg-[#6c47ff] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5a3de0] transition"
                  >
                    View my meal plan
                  </Link>
                  <Link
                    href="/recipes"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                  >
                    Browse recipes
                  </Link>
                  <Link
                    href="/add-recipe"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#6c47ff] hover:bg-[#f4f0ff] transition"
                  >
                    Add a recipe
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center justify-center rounded-full bg-[#6c47ff] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5a3de0] transition"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/recipes"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                  >
                    Browse recipes
                  </Link>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#6c47ff] hover:bg-[#f4f0ff] transition"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-2">Monday</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Lemon Chicken</h3>
                <p className="text-sm text-gray-600">Fresh, simple and weeknight-friendly</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-2">Tuesday</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Veggie Pasta</h3>
                <p className="text-sm text-gray-600">Quick comfort food with colour</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm sm:col-span-2">
                <p className="text-sm font-medium text-gray-500 mb-3">Why people use MealPlanner</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>• Keep your recipes in one place</li>
                  <li>• Plan meals for the whole week</li>
                  <li>• Make cooking feel less stressful</li>
                </ul>
              </div>
            </div>
            <div className="absolute -z-10 -top-6 -right-6 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-6 h-40 w-40 rounded-full bg-[#d9ceff] blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}