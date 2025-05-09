import Markdown from "react-markdown";
import "./Recipe.css";

export default function Recipe({ recipe, ref }) {
  return (
    <section
      ref={ref}
      className="inner-wrapper anim-slide recipe__result"
      aria-live="polite"
    >
      <h2>Chef Claude Recommends:</h2>
      <Markdown>{recipe}</Markdown>
    </section>
  );
}
