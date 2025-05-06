import { useState } from "react";
import { getDatafromAPI } from "../utils.js";
import logo from "/claude.png"
import "./Main.css";

import Ingredients from "./Ingredients";
import ActionModal from "./ActionModal";
import Recipe from "./Recipe";

// const testArr = ["noodles", "eggs", "pasta", "tomato paste", "butter"]

export default function Main() {

  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState("")

  function addIngredients(formData) {
    setIngredients(prevVal => [...prevVal, formData.get("inpIngre")])
  }

  async function getRecipe() {
    setRecipe(await getDatafromAPI(ingredients))
  }

  return (
    <main className="wrapper">
      <header className="main-header">
        <img src={logo} alt="chef logo" />
        <h1 className="heading">Chef Claude</h1>
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

      {ingredients.length > 0 && <Ingredients ingredients={ingredients} />}
      {ingredients.length > 4 && <ActionModal ingredients={ingredients} onClick={getRecipe} />}
      {recipe && <Recipe recipe={recipe} />}

    </main >
  )
}
