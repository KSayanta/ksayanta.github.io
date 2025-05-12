import "./Die.css";

export default function Die({ value, isHeld, onClick }) {
  return (
    <button
      className="btn die"
      aria-label={`Die with value ${value}, ${value ? "held" : "not held"}`}
      aria-pressed={isHeld}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
