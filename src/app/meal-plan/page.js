export default function MealPlanPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Meal Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
          <div key={day} className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">{day}</h2>
            <div className="h-24 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </main>
  );
}