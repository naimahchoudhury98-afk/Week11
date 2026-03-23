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
    instructions: "1. Cook pasta. 2. Fry onion and garlic. 3. Add mince and brown. 4. Add tomatoes and simmer 20 mins. 5. Serve over pasta.",
    image_url: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
    cuisine: "Italian",
    user_id: null
  },
  {
    title: "Chicken Tikka Masala",
    description: "Creamy, spiced chicken curry — a British favourite",
    ingredients: "500g chicken breast, 400ml coconut milk, 2 tbsp tikka paste, 1 onion, 400g tinned tomatoes, coriander",
    instructions: "1. Marinate chicken. 2. Fry onion. 3. Add paste and cook. 4. Add chicken and tomatoes. 5. Stir in coconut milk and simmer.",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    cuisine: "Indian",
    user_id: null
  },
  {
    title: "Avocado Toast",
    description: "Simple, healthy and delicious breakfast",
    ingredients: "2 slices sourdough, 1 avocado, lemon juice, chilli flakes, salt, pepper",
    instructions: "1. Toast bread. 2. Mash avocado with lemon juice. 3. Spread on toast. 4. Season and serve.",
    image_url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820",
    cuisine: "American",
    user_id: null
  },
  {
    title: "Vegetable Stir Fry",
    description: "Quick and healthy veggie stir fry",
    ingredients: "Mixed vegetables, soy sauce, garlic, ginger, sesame oil, noodles",
    instructions: "1. Cook noodles. 2. Fry garlic and ginger. 3. Add vegetables and stir fry. 4. Add soy sauce. 5. Toss with noodles.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cuisine: "Asian",
    user_id: null
  },
  {
    title: "Beef Tacos",
    description: "Juicy beef tacos with fresh toppings",
    ingredients: "500g minced beef, taco shells, lettuce, tomato, cheese, sour cream, taco seasoning",
    instructions: "1. Brown mince with seasoning. 2. Warm taco shells. 3. Fill with beef and toppings.",
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
        [recipe.title, recipe.description, recipe.ingredients, recipe.instructions, recipe.image_url, recipe.cuisine, recipe.user_id]
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