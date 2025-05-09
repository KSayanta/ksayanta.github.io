import "./Ingredients.css";

export default function Ingredients({ ingredients }) {
  return (
    <section className="inner-wrapper anim-slide user-entry ">
      <h2 className="title">Ingredients on hand:</h2>
      <ul className="list list-inside list-disc list-wrap">
        {ingredients.map(i => (
          <li key={i} className="list-item">
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}
