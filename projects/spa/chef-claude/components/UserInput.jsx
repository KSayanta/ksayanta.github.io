import "./UserInput.css";

export default function UserInput({ action }) {
  return (
    <form action={action} className="main-form inner-wrapper">
      <input
        type="text"
        name="inpIngre"
        aria-label="Enter name of ingredient."
        placeholder="e.g. Oregano"
      />
      <button type="submit">Add Ingredient</button>
    </form>
  );
}
