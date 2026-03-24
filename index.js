import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Submit Meal Plan and Recipes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar */}
      <div className="navbar" role="navigation" aria-label="Main navigation">
        <a href="#" aria-label="Go to home page">Home</a>
        <a href="#" aria-label="Go to about page">About</a>
        <a href="#" aria-label="Go to contact page">Contact</a>

        <div className="navbar-right">
          <a href="#" aria-label="Login to your account">Login</a>
        </div>

        <div className="scroll-box" aria-hidden="true"></div>
      </div>

      <main style={{ padding: '20px' }} role="main">
        <h1>Submit Your Meal Plans and Recipes</h1>

        <form action="#" method="post" aria-label="Meal plan submission form">
          <fieldset>
            <legend>Who the Author is</legend>

            <label htmlFor="author_name">Name:</label><br />
            <input type="text" id="author_name" name="author_name" aria-required="true" /><br /><br />

            <label htmlFor="post_date">Date:</label><br />
            <input type="date" id="post_date" name="post_date" /><br /><br />
          </fieldset>

          <br />

          <fieldset>
            <legend>What the post is about</legend>

            <label htmlFor="post_title">Post Title:</label><br />
            <input type="text" id="post_title" name="post_title" aria-required="true" /><br /><br />

            <label htmlFor="description">Description:</label><br />
            <textarea id="description" name="description" rows="4" cols="50"></textarea><br /><br />
          </fieldset>

          <br />

          <fieldset>
            <legend>Daily Meal Plan</legend>

            <label htmlFor="breakfast">Breakfast:</label><br />
            <input type="text" id="breakfast" name="breakfast" /><br /><br />

            <label htmlFor="lunch">Lunch:</label><br />
            <input type="text" id="lunch" name="lunch" /><br /><br />

            <label htmlFor="dinner">Dinner:</label><br />
            <input type="text" id="dinner" name="dinner" /><br /><br />

            <label htmlFor="snacks">Snacks:</label><br />
            <textarea id="snacks" name="snacks" rows="3" cols="50"></textarea>
          </fieldset>

          <br />

          <fieldset>
            <legend>Recipe Details</legend>

            <label htmlFor="recipe_name">Recipe Name:</label><br />
            <input type="text" id="recipe_name" name="recipe_name" /><br /><br />

            <label htmlFor="prep_time">Prep Time:</label><br />
            <input type="text" id="prep_time" name="prep_time" /><br /><br />

            <label htmlFor="cook_time">Cook Time:</label><br />
            <input type="text" id="cook_time" name="cook_time" /><br /><br />

            <label htmlFor="servings">Servings:</label><br />
            <input type="number" id="servings" name="servings" /><br /><br />

            <label htmlFor="ingredients">Ingredients:</label><br />
            <textarea id="ingredients" name="ingredients" rows="5" cols="50"></textarea><br /><br />

            <label htmlFor="instructions">Instructions:</label><br />
            <textarea id="instructions" name="instructions" rows="5" cols="50"></textarea><br /><br />
          </fieldset>

          <br />

          <input type="submit" value="Submit Post" aria-label="Submit your meal plan" />
          <input type="reset" value="Clear Form" aria-label="Clear the form" />
        </form>
      </main>
    </>
  );
}      
