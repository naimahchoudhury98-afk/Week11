const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const recipes = [
  {
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce",
    ingredients: "500g spaghetti, 400g minced beef, 1 onion, 2 garlic cloves, 400g tinned tomatoes, olive oil, salt, pepper",
    instructions: "Cook pasta. Fry onion and garlic. Add mince and brown. Add tomatoes and simmer for 20 minutes. Serve over pasta.",
    image_url: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
    cuisine: "Italian",
    user_id: null
  },
  {
    title: "Chicken Tikka Masala",
    description: "Creamy, spiced chicken curry — a British favourite",
    ingredients: "500g chicken breast, 400ml coconut milk, 2 tbsp tikka paste, 1 onion, 400g tinned tomatoes, coriander",
    instructions: "Marinate chicken. Fry onion. Add tikka paste and cook. Add chicken and tomatoes. Stir in coconut milk and simmer.",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    cuisine: "Indian",
    user_id: null
  },
  {
    title: "Avocado Toast",
    description: "Simple, healthy and delicious breakfast",
    ingredients: "2 slices sourdough, 1 avocado, lemon juice, chilli flakes, salt, pepper",
    instructions: "Toast bread. Mash avocado with lemon juice. Spread on toast. Season and serve.",
    image_url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820",
    cuisine: "American",
    user_id: null
  },
  {
    title: "Vegetable Stir Fry",
    description: "Quick and healthy veggie stir fry",
    ingredients: "Mixed vegetables, soy sauce, garlic, ginger, sesame oil, noodles",
    instructions: "Cook noodles. Fry garlic and ginger. Add vegetables and stir fry. Add soy sauce. Toss with noodles.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cuisine: "Asian",
    user_id: null
  },
  {
    title: "Beef Tacos",
    description: "Juicy beef tacos with fresh toppings",
    ingredients: "500g minced beef, taco shells, lettuce, tomato, cheese, sour cream, taco seasoning",
    instructions: "Brown mince with seasoning. Warm taco shells. Fill with beef and toppings.",
    image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    cuisine: "Mexican",
    user_id: null
  }
];

async function seed() {
  try {
    for (const recipe of recipes) {
      await pool.query(
        "INSERT INTO recipes (title, description, ingredients, instructions, image_url, cuisine, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          recipe.title,
          recipe.description,
          recipe.ingredients,
          recipe.instructions,
          recipe.image_url,
          recipe.cuisine,
          recipe.user_id
        ]
      );
      console.log(`Added: ${recipe.title} ✅`);
    }
    console.log("Seeding complete! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();