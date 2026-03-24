export default function PlannerForm() {
  return (
    <fieldset>
      <legend>Daily Meal Plan</legend>

      <label htmlFor="breakfast">Breakfast:</label>
      <input id="breakfast" type="text" name="breakfast" />

      <label htmlFor="lunch">Lunch:</label>
      <input id="lunch" type="text" name="lunch" />

      <label htmlFor="dinner">Dinner:</label>
      <input id="dinner" type="text" name="dinner" />

      <label htmlFor="snacks">Snacks:</label>
      <textarea id="snacks" name="snacks" rows="3" cols="50"></textarea>
    </fieldset>
  );
}
