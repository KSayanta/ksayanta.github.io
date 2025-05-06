import { useState } from "react";
import { getDatafromAPI } from "/src/utils.js";
import './Main.css'

import UserInput from "./UserInput";
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
      <UserInput action={addIngredients} />
      {ingredients.length > 0 && <Ingredients ingredients={ingredients} />}
      {ingredients.length > 4 && <ActionModal ingredients={ingredients} onClick={getRecipe} />}
      {recipe && <Recipe recipe={recipe} />}
    </main >
  )
}
