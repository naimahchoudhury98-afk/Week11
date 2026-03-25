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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="bg-white/90 backdrop-blur shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

              <Link href="/" className="text-xl font-bold tracking-wide text-gray-900">
                🍽️ MealPlanner
              </Link>

              <nav className="flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                  Home
                </Link>
                <Link href="/recipes" className="text-gray-600 hover:text-gray-900 text-sm">
                  Recipes
                </Link>
                <Show when="signed-in">
                  <Link href="/meal-plan" className="text-gray-600 hover:text-gray-900 text-sm">
                    My Meal Plan
                  </Link>
                  <Link href="/add-recipe" className="text-gray-600 hover:text-gray-900 text-sm">
                    Add Recipe
                  </Link>
                  <UserButton />
                </Show>
                <Show when="signed-out">
                  <SignInButton />
                  <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </Show>
              </nav>

            </div>
          </header>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}