import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl text-gray-900">
          🍽️ MealPlanner
        </Link>
        <Link href="/recipes" className="text-gray-600 hover:text-gray-900">
          Recipes
        </Link>
        <SignedIn>
          <Link href="/meal-plan" className="text-gray-600 hover:text-gray-900">
            My Meal Plan
          </Link>
          <Link href="/add-recipe" className="text-gray-600 hover:text-gray-900">
            Add Recipe
          </Link>
        </SignedIn>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in" className="text-gray-600 hover:text-gray-900">
            Sign In
          </Link>
          <Link href="/sign-up" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign Up
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </nav>
  );
}