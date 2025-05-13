import "./Die.css";

export default function Die({ value, isHeld, onClick }) {
  return (
    <button
      className="btn die"
      data-value={value}
      aria-label={`Die with value ${value}, ${value ? "held" : "not held"}`}
      aria-pressed={isHeld}
      onClick={onClick}
    ></button>
  );
}
