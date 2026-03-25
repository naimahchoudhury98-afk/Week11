CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  clerk_id VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL,
  avatar_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image_url VARCHAR,
  cuisine VARCHAR,
  user_id VARCHAR REFERENCES users(clerk_id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE meal_plan (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(clerk_id),
  recipe_id INTEGER REFERENCES recipes(id),
  day_of_week VARCHAR NOT NULL,
  meal_type VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE recipes DROP CONSTRAINT recipes_user_id_fkey;
ALTER TABLE meal_plan DROP CONSTRAINT meal_plan_user_id_fkey;
