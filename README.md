# 🍽️ MealPlanner

> *Make meal planning feel effortless.*

A full stack community meal planning application where users can discover recipes, contribute their own, and organise their week with a personal meal plan.

---

## 🌐 Live Demo

> Deployment link coming soon

---

## 📋 Table of Contents

- [Problem Domain](#problem-domain)
- [User Stories](#user-stories)
- [MVP & Stretch Goals](#mvp--stretch-goals)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Route Map](#route-map)
- [Project Planning](#project-planning)
- [Team & Contributions](#team--contributions)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## 🎯 Problem Domain

MealPlanner helps individuals and households decide what to eat by providing a community-driven recipe platform with a personal weekly meal planner. Users can discover recipes shared by others, contribute their own, and organise their week by adding meals to their personal plan — removing the daily stress of deciding what to cook.

---

## 📖 User Stories

1. As a new user, I want to sign up for an account so that I can access my personal meal planner
2. As a returning user, I want to log in securely so that only I can see and manage my meal plan
3. As a logged in user, I want to browse community recipes so that I can get inspiration for meals
4. As a logged in user, I want to search for recipes by name or cuisine so that I can find something specific
5. As a logged in user, I want to view a single recipe in full detail so that I can see the ingredients and instructions
6. As a logged in user, I want to submit my own recipe so that I can share it with the community
7. As a logged in user, I want to add a recipe to my weekly meal plan so that I know what I am eating each day
8. As a logged in user, I want to remove a recipe from my meal plan so that I can make changes when needed

### Stretch Goal User Stories

9. As a logged in user, I want to delete a recipe I submitted so that I can manage my own content
10. As a logged in user, I want to see my meal plan displayed as a weekly calendar so that I can plan at a glance

---

## ✅ MVP & Stretch Goals

### MVP
- User sign up and sign in via Clerk
- Browse all community recipes
- Search recipes by title or cuisine
- View a single recipe in full detail
- Submit a new recipe (logged in users only)
- Add a recipe to personal meal plan with day and meal type
- Remove a recipe from meal plan
- View meal plan as a weekly grid

### Stretch Goals
- Delete your own recipe
- Filter recipes by cuisine dropdown
- Auto-generate a shopping list from meal plan
- Profile page showing user's submitted recipes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Framework, routing, and API routes |
| React | Front end UI components |
| PostgreSQL | Relational database |
| Supabase | Cloud database hosting |
| Clerk | User authentication |
| Tailwind CSS | Styling |
| Node.js / pg | Database connection pool |

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  clerk_id    VARCHAR NOT NULL UNIQUE,
  username    VARCHAR NOT NULL,
  avatar_url  VARCHAR,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR NOT NULL,
  description  TEXT,
  ingredients  TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image_url    VARCHAR,
  cuisine      VARCHAR,
  user_id      VARCHAR,
  created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE meal_plan (
  id          SERIAL PRIMARY KEY,
  user_id     VARCHAR NOT NULL,
  recipe_id   INTEGER REFERENCES recipes(id),
  day_of_week VARCHAR NOT NULL,
  meal_type   VARCHAR NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

## 🔗 API Routes

| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/api/recipes` | Fetch all community recipes | No |
| POST | `/api/recipes` | Submit a new recipe | Yes |
| GET | `/api/recipes/[id]` | Fetch a single recipe | No |
| DELETE | `/api/recipes/[id]` | Delete a recipe | Yes |
| GET | `/api/mealplan?user_id=` | Fetch user's meal plan | Yes |
| POST | `/api/mealplan` | Add recipe to meal plan | Yes |
| DELETE | `/api/mealplan/[id]` | Remove from meal plan | Yes |
| POST | `/api/users` | Create user on first sign in | Yes |

---

## 🗺️ Route Map

| Route | Page | Access |
|---|---|---|
| `/` | Homepage | Public |
| `/recipes` | Browse all recipes | Public |
| `/recipes/[id]` | Single recipe detail | Public |
| `/add-recipe` | Add a new recipe | Protected |
| `/meal-plan` | Personal meal plan | Protected |
| `/sign-in` | Sign in page | Public |
| `/sign-up` | Sign up page | Public |

### Protected vs Public Routes
- **Public** — `/`, `/recipes`, `/recipes/[id]`, `/sign-in`, `/sign-up`
- **Protected** — `/meal-plan`, `/add-recipe`

---

## 🎨 Wireframes

> Wireframes created in Figma — see planning documentation

---

## 📊 Project Planning

### Problem Domain Statement
> *"Helping individuals and households decide what to eat by providing a community recipe platform with a personal weekly meal planner — removing the daily stress of deciding what to cook."*

### Communication
- Discord — daily communication, code sharing, and stand-ups (separate frontend and backend channels)
- Trello — task management and progress tracking
- GitHub — version control and pull requests
- Google Meet — daily check-ins

### Git Workflow
- Each feature developed on a separate branch
- Pull requests reviewed and approved by a teammate before merging
- Never working directly on `main`
- Clear and descriptive commit messages
---

## 👥 Team & Contributions

| Name | Role | Contributions |
|---|---|---|
| Naimah | Back End | Supabase setup, database schema and tables, Clerk auth, all API routes, recipe form, seed file, DB connection |
| Marissa | Back End / Planning | Wireframes, Figma designs, back end support, bug fixes |
| Sarah | Front End | HTML structure, navbar, homepage, recipes page, accessibility |
| Mahira | Front End | CSS styling, Tailwind, responsive design, routes, components |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- A Supabase account — [supabase.com](https://supabase.com)
- A Clerk account — [clerk.com](https://clerk.com)

### Installation

**1. Clone the repository**
```bash
git clone <your-SSH-link>
cd mealplanner
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root folder:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_supabase_postgres_url
```

> ⚠️ Never commit `.env.local` to GitHub — it is already in `.gitignore`

**4. Set up the database**

Run the SQL in `database.sql` in your Supabase SQL Editor to create the tables.

**5. Seed the database with dummy data**
```bash
node seed.js
```

**6. Run the development server**
```bash
npm run dev
```

**7. Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
mealplanner/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── recipes/
│   │   │   │   ├── route.js          # GET all, POST recipe
│   │   │   │   └── [id]/
│   │   │   │       └── route.js      # GET one, DELETE recipe
│   │   │   ├── mealplan/
│   │   │   │   ├── route.js          # GET, POST meal plan
│   │   │   │   └── [id]/
│   │   │   │       └── route.js      # DELETE meal plan item
│   │   │   └── users/
│   │   │       └── route.js          # POST create user
│   │   ├── recipes/
│   │   │   ├── page.js               # Browse all recipes + search
│   │   │   └── [id]/
│   │   │       └── page.js           # Single recipe + add to plan modal
│   │   ├── add-recipe/
│   │   │   └── page.js               # Add recipe form
│   │   ├── meal-plan/
│   │   │   └── page.js               # Weekly meal plan grid
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── layout.js                 # Root layout with navbar + footer
│   │   └── page.js                   # Homepage
│   ├── components/
│   │   ├── Footer.jsx                # Site footer
│   │   ├── Nav.jsx                   # Navigation bar
│   │   └── SearchBar.jsx             # Search component
│   └── lib/
│       └── db.js                     # Database connection pool
├── seed.js                           # Database seed file
├── database.sql                      # Database schema SQL
├── middleware.ts                     # Clerk auth middleware
└── .env.local                        # Environment variables (not committed)
```

---

## 🙏 Acknowledgements

Built as part of the TechEd bootcamp — Week 11 Final Project.

*Built with ❤️ by Naimah, Marissa, Sarah and Mahira*
