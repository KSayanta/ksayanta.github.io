import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Dice from "./Dice";
import "./Main.css";

export default function Main() {
  const btnNewGameRef = useRef(null);
  const [diceArr, setDiceArr] = useState(() => generateAllNewDice()); // Lazy State Init

  const gameWon =
    diceArr.every(die => die.isHeld) &&
    diceArr.every(die => diceArr[0].value === die.value);

  function generateAllNewDice() {
    const randDice = () => ({
      id: nanoid(),
      isHeld: false,
      value: Math.ceil(Math.random() * 6),
    });

    return new Array(10).fill(0).map(randDice);
  }

  function handleReroll() {
    setDiceArr(prevDiceArr =>
      prevDiceArr.map(dice =>
        !dice.isHeld
          ? {
              ...dice,
              value: Math.ceil(Math.random() * 6),
            }
          : dice
      )
    );
  }

  function handleReset() {
    setDiceArr(generateAllNewDice());
  }

  useEffect(() => {
    btnNewGameRef.current && btnNewGameRef.current.focus();
  }, [gameWon]);

  return (
    <main className="main wrapper wrapper--flex">
      <section className="canvas">
        <p className="instructions">
          Roll until all dice are the same.<br></br> Click each die to freeze it
          at its current value between rolls.
        </p>

        <Dice diceArr={diceArr} setDiceArr={setDiceArr} />

        {gameWon ? (
          <button
            className="btn btn-cta"
            onClick={handleReset}
            ref={btnNewGameRef}
          >
            New Game
          </button>
        ) : (
          <button className="btn btn-cta" onClick={handleReroll}>
            Reroll
          </button>
        )}
      </section>

      {gameWon && <Confetti />}

      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
    </main>
  );
}
