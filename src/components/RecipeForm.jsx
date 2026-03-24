"use client";

export default function RecipeForm() {
  return (
    <fieldset>
      <legend>Recipe Details</legend>

      <label htmlFor="recipe_name">Recipe Name:</label>
      <input id="recipe_name" type="text" name="recipe_name" />

      <label htmlFor="prep_time">Prep Time:</label>
      <input id="prep_time" type="text" name="prep_time" />

      <label htmlFor="cook_time">Cook Time:</label>
      <input id="cook_time" type="text" name="cook_time" />

      <label htmlFor="servings">Servings:</label>
      <input id="servings" type="number" name="servings" />

      <label htmlFor="ingredients">Ingredients:</label>
      <textarea
        id="ingredients"
        name="ingredients"
        rows="5"
        cols="50"
      ></textarea>

      <label htmlFor="ingredients">Instructions:</label>
      <textarea name="instructions" rows="5" cols="50"></textarea>
    </fieldset>
  );
}
