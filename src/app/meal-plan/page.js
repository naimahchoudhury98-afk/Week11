"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function MealPlanPage() {
  const { user } = useUser();
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/mealplan?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setMealPlan(data));
  }, [user]);

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const mealTypes = ["Breakfast","Lunch","Dinner","Snack"];

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
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Meal Plan</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-500 text-sm w-24">Meal</th>
              {days.map(day => (
                <th key={day} className="p-3 text-center text-sm font-semibold text-gray-700 border-b">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map(mealType => (
              <tr key={mealType}>
                <td className="p-3 text-sm font-medium text-gray-500">{mealType}</td>
                {days.map(day => {
                  const meal = getMeal(day, mealType);
                  return (
                    <td key={day} className="p-2 border text-center align-top min-w-28">
                      {meal ? (
                        <div className="bg-green-50 rounded-lg p-2 text-sm">
                          <a href={`/recipes/${meal.recipe_id}`} className="font-medium text-gray-800 hover:text-blue-600 hover:underline">
                          {meal.title}
                          </a>
                          <button
                            onClick={() => handleDelete(meal.id)}
                            className="text-red-400 text-xs mt-1 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="h-16 bg-gray-50 rounded-lg"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}