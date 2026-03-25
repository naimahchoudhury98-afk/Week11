import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MealPlanner",
  description: "Plan your week with community-powered recipes",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#faf7f2] text-gray-900`}
        >
          <div className="min-h-screen flex flex-col">
            <header className="w-full pt-6">
              <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-gray-900"
                >
                  <span className="text-2xl">🍽️</span>
                  <span>
                    Meal<span className="text-[#6c47ff]">Planner</span>
                  </span>
                </Link>

                <nav className="flex items-center gap-8">
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                  >
                    Home
                  </Link>

                  <Link
                    href="/recipes"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                  >
                    Recipes
                  </Link>

                  <Show when="signed-in">
                    <Link
                      href="/meal-plan"
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                    >
                      My Meal Plan
                    </Link>

                    <Link
                      href="/add-recipe"
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                    >
                      Add Recipe
                    </Link>

                    <UserButton />
                  </Show>

                  <Show when="signed-out">
                    <SignInButton>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                        Sign In
                      </button>
                    </SignInButton>

                    <SignUpButton>
                      <button className="rounded-full bg-[#6c47ff] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3de0] transition">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </Show>
                </nav>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}