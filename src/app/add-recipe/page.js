import PlannerForm from "@/components/PlannerForm";
import Head from "next/head";

export default function AddRecipeForm() {
  return (
    <>
      <Head>
        <title>Submit Meal Plan and Recipes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ padding: "20px" }}>
        <h1>Submit Your Meal Plans and Recipes</h1>

        <form action="#" method="post">
          <fieldset>
            <legend>Who the Author is</legend>

            <label>Name:</label>
            <br />
            <input type="text" name="author_name" />
            <br />
            <br />

            <label>Date:</label>
            <br />
            <input type="date" name="post_date" />
            <br />
            <br />
          </fieldset>

          <br />

          <fieldset>
            <legend>What the post is about</legend>

            <label>Post Title:</label>
            <br />
            <input type="text" name="post_title" />
            <br />
            <br />

            <label>Description:</label>
            <br />
            <textarea name="description" rows="4" cols="50"></textarea>
            <br />
            <br />
          </fieldset>

          <PlannerForm />

          <fieldset>
            <legend>Recipe Details</legend>

            <label>Recipe Name:</label>
            <br />
            <input type="text" name="recipe_name" />
            <br />
            <br />

            <label>Prep Time:</label>
            <br />
            <input type="text" name="prep_time" />
            <br />
            <br />

            <label>Cook Time:</label>
            <br />
            <input type="text" name="cook_time" />
            <br />
            <br />

            <label>Servings:</label>
            <br />
            <input type="number" name="servings" />
            <br />
            <br />

            <label>Ingredients:</label>
            <br />
            <textarea name="ingredients" rows="5" cols="50"></textarea>
            <br />
            <br />

            <label>Instructions:</label>
            <br />
            <textarea name="instructions" rows="5" cols="50"></textarea>
            <br />
            <br />
          </fieldset>

          <br />

          <input type="submit" value="Submit Post" />
          <input type="reset" value="Clear Form" />
        </form>
      </main>
    </>
  );
}
