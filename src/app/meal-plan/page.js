"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function MealPlanPage() {
  const { user } = useUser();
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/mealplan?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setMealPlan(data));
  }, [user]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  function getMeal(day, mealType) {
    return mealPlan.find(
      (m) => m.day_of_week === day && m.meal_type === mealType
    );
  }

  async function handleDelete(id) {
    await fetch(`/api/mealplan/${id}`, { method: "DELETE" });
    setMealPlan(mealPlan.filter((m) => m.id !== id));
  }

  return (
    <div className="min-h-screen px-6 pt-16 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 mb-4">
            Your weekly meals
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            My Meal Plan
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl">
            Organise your breakfasts, lunches, dinners, and snacks for the week ahead.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[28px] bg-white shadow-sm ring-1 ring-gray-100">
          <table className="w-full min-w-[900px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white px-4 py-5 text-left text-sm font-semibold text-gray-500 border-b border-gray-100 w-32">
                  Meal
                </th>

                {days.map((day) => (
                  <th
                    key={day}
                    className="bg-white px-4 py-5 text-center text-sm font-semibold text-gray-700 border-b border-gray-100"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {mealTypes.map((mealType, rowIndex) => (
                <tr key={mealType}>
                  <td className={`sticky left-0 z-10 bg-white px-4 py-6 text-sm font-semibold text-gray-500 align-top ${rowIndex !== mealTypes.length - 1 ? "border-b border-gray-100" : ""}`}>
                    {mealType}
                  </td>

                  {days.map((day) => {
                    const meal = getMeal(day, mealType);

                    return (
                      <td
                        key={day}
                        className={`px-3 py-4 align-top min-w-[170px] ${rowIndex !== mealTypes.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {meal ? (
                          <div className="rounded-2xl bg-[#faf8ff] p-4 ring-1 ring-[#ede7ff]">
                            <Link
                              href={`/recipes/${meal.recipe_id}`}
                              className="block text-sm font-semibold text-gray-900 hover:text-[#6c47ff] transition"
                            >
                              {meal.title}
                            </Link>

                            <button
                              onClick={() => handleDelete(meal.id)}
                              className="mt-3 text-xs font-medium text-red-500 hover:text-red-700 transition"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="h-[88px] rounded-2xl bg-gray-50 ring-1 ring-gray-100" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mealPlan.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-gray-100">
            <p className="text-lg font-medium text-gray-700">
              Your meal plan is empty
            </p>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Start adding recipes to build your week.
            </p>

            <Link
              href="/recipes"
              className="inline-flex items-center justify-center rounded-full bg-[#6c47ff] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5a3de0] transition"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}