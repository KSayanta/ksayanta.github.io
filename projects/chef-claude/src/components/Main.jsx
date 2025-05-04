import { useState } from "react";
import "./Main.css";
import logo from "/claude.png"

export default function Main() {

  const [ingredients, setIngredients] = useState([])

  function compResult() {
    return (
      <section id="response" className="result inner-wrapper anim-slide">
        <h2 className="title">Suggested recipe:</h2>
        <p className="response-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste asperiores tempore nostrum cumque recusandae blanditiis doloremque, neque facere accusamus temporibus repellendus porro velit nobis eveniet autem assumenda deleniti nam dicta.</p>

        <h3>Ingredients:</h3>
        <ul className="list list-inside list-disc">
          <li className="list-item">Baking Soda</li>
          <li className="list-item">Spinach</li>
          <li className="list-item">Onion</li>
          <li className="list-item">Eggs</li>

          <li className="list-item">Baking Soda</li>
          <li className="list-item">Spinach</li>
          <li className="list-item">Onion</li>
          <li className="list-item">Eggs</li>

          <li className="list-item">Baking Soda</li>
          <li className="list-item">Spinach</li>
          <li className="list-item">Onion</li>
          <li className="list-item">Eggs</li>

          <li className="list-item">Baking Soda</li>
          <li className="list-item">Spinach</li>
          <li className="list-item">Onion</li>
          <li className="list-item">Eggs</li>
        </ul>

        <h3>Instructions:</h3>
        <ol className="list list-inside">
          <li className="list-item response-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius unde veniam a dolore, omnis distinctio magni minima vitae adipisci eveniet aspernatur corrupti ipsa deleniti ducimus reiciendis! Doloremque perferendis eos beatae!</li>
          <li className="list-item response-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, recusandae ad. Amet ab similique mollitia sapiente consequatur nesciunt facere nisi dolores fugiat facilis. Reiciendis excepturi necessitatibus asperiores pariatur culpa ab.</li>
          <li className="list-item response-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem earum, sit cupiditate amet nobis culpa tempore laudantium repellat id quasi voluptatem dolorum odit deserunt cumque odio? Porro aliquid perspiciatis consequatur.</li>
          <li className="list-item response-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias illum explicabo aliquid sed rem, delectus velit odio saepe, laudantium unde itaque ea in, fugit eveniet cumque ad possimus nostrum quam.</li>
          <li className="list-item response-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sunt, maxime facere corporis at ipsum quidem voluptates velit voluptatum dolor. Temporibus repellendus ratione iure debitis odit ex eius tempora quidem.</li>
          <li className="list-item response-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium aliquam hic, error, maxime et deserunt modi numquam eaque illum perspiciatis minima libero doloribus. Vel eius, ipsa tempore consequuntur neque esse?</li>
          <li className="list-item response-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, voluptatibus eos cupiditate quaerat sint obcaecati maxime nostrum iusto inventore non iste repellendus at, possimus nesciunt, doloribus aliquam consectetur molestiae corporis!</li>
          <li className="list-item response-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit omnis inventore explicabo pariatur. Reprehenderit alias iusto sapiente vitae dicta, accusamus necessitatibus, voluptatibus eos maiores ab aspernatur provident reiciendis nam vero?</li>
        </ol>
      </section>
    )
  }

  function compList() {
    return (
      <section className="user-entry inner-wrapper anim-slide">
        <h2 className="title">Ingredients on hand:</h2>
        <ul className="list list-inside list-disc wrap">{
          ingredients.map(i => (
            <li className="list-item">{i}</li>
          ))
        }
        </ul>
      </section>
    )
  }

  function compModal() {
    return (
      <section className="modal inner-wrapper anim-slide">
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients.</p>
        <button className="btn btn-cta">Get a recipe</button>
      </section>
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
      {ingredients.length > 4 && compModal()}
      {compResult()}
    </main >
  )
}
