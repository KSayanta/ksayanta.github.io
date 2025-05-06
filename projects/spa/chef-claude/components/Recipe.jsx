import Markdown from 'react-markdown'
import './Recipe.css'

export default function Recipe({ recipe }) {

  return (
    <section className="inner-wrapper anim-slide recipe__result" aria-live='polite'>
      <h2>Chef Claude Recommends:</h2>
      <Markdown>
        {recipe}
      </Markdown>
    </section>
  )
}


/* <section id="response" className="result inner-wrapper anim-slide">
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
</section> */
