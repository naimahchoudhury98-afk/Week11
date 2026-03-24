"use client";

export default function Form() {
  function submitForm(e) {
    e.preventDefault();
  }

  return (
    <form action="#" method="post">
      <fieldset>
        <legend>Who the Author is</legend>

        <label htmlFor="author_name">Name:</label>

        <input id="author_name" type="text" name="author_name" />

        <label htmlFor="post_date">Date:</label>
        <input id="post_date" type="date" name="post_date" />
      </fieldset>

      <fieldset>
        <legend>What the post is about</legend>

        <label htmlFor="post_title">Post Title:</label>
        <input id="post_title" type="text" name="post_title" />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
        ></textarea>
      </fieldset>

      <input type="submit" value="Submit Post" />
      <input type="reset" value="Clear Form" />
    </form>
  );
}
