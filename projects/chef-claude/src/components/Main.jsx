import "./Main.css";
import logo from "/claude.png"

export default function Main() {

  return (
    <main className="wrapper">
      <header className="main-header">
        <img src={logo} alt="chef logo" />
        <span className="heading">Chef Claude</span>
      </header>

      <form action="GET" className="main-form inner-wrapper">
        <input
          type="text"
          id="inpIngre"
          aria-label="Enter name of ingredient."
          placeholder="e.g. Oregano"
        />
        <button type="submit">Add Ingredient</button>
      </form>

      <div className="list inner-wrapper">
        <h2 className="title">Ingredients on hand:</h2>

        <ul>
          <li className="list-item">Chicken breasts</li>
          <li className="list-item">Olive oil</li>
          <li className="list-item">Heavy cream</li>
          <li className="list-item">Spinach</li>
          <li className="list-item">Most spices</li>
        </ul>
      </div>

      <div className="footer inner-wrapper">
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients.</p>
        <button className="btn btn-cta">Get a recipe</button>
      </div>
    </main>
  )
}
