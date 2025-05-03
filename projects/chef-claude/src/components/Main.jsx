import { useState } from "react";
import "./Main.css";
import logo from "/claude.png"

export default function Main() {

  const [ingredients, setIngredients] = useState([])

  function compList() {
    return (
      <div className="list inner-wrapper anim-slide">
        <h2 className="title">Ingredients on hand:</h2>
        <ul>{
          ingredients.map(i => (
            <li className="list-item">{i}</li>
          ))
        }
        </ul>
      </div>
    )
  }

  function compFooter() {
    return (
      <div className="footer inner-wrapper anim-slide">
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients.</p>
        <button className="btn btn-cta">Get a recipe</button>
      </div>
    )
  }

  function addIngredients(formData) {
    setIngredients(prevVal => [...prevVal, formData.get("inpIngre")])
  }

  return (
    <main className="wrapper">
      <header className="main-header">
        <img src={logo} alt="chef logo" />
        <span className="heading">Chef Claude</span>
      </header>

      <form action={addIngredients} className="main-form inner-wrapper">
        <input
          type="text"
          name="inpIngre"
          aria-label="Enter name of ingredient."
          placeholder="e.g. Oregano"
        />
        <button type="submit">Add Ingredient</button>
      </form>

      {ingredients.length > 0 && compList()}
      {ingredients.length > 4 && compFooter()}
    </main >
  )
}
