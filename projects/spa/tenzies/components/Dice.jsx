import Die from "./Die";
import "./Dice.css";

export default function Dice({ diceArr, handleHeld }) {
  return (
    <div className="die-wrapper">
      {diceArr.map(die => (
        <Die
          key={die.id}
          isHeld={die.isHeld}
          value={die.value}
          onClick={() => handleHeld(die.id)}
        />
      ))}
    </div>
  );
}
