import Die from "./Die";
import "./Dice.css";

export default function Dice({ diceArr, setDiceArr }) {
  function handleHeld(id) {
    setDiceArr(prevDiceArr =>
      prevDiceArr.map(dice =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

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
