import "./ActionModal.css";

export default function ActionModal({ ingredients, onClick: getRecipe }) {
  return (
    <section className="modal inner-wrapper anim-slide">
      <h3>Ready for a recipe?</h3>
      <p>Generate a recipe from your list of ingredients.</p>
      <button onClick={() => getRecipe(ingredients)} className="btn btn-cta">
        Get a recipe
      </button>
    </section>
  );
}
