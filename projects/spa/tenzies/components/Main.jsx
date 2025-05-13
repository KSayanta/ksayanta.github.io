import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Dice from "./Dice";
import "./Main.css";

export default function Main() {
  const btnNewGameRef = useRef(null);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [rolled, setRolled] = useState(0);
  const [timer, setTimer] = useState(0);
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
    if (!gameInProgress) setGameInProgress(true);
    setRolled(prevVal => prevVal + 1);
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

  function handleHeld(id) {
    if (!gameInProgress) setGameInProgress(true);
    setDiceArr(prevDiceArr =>
      prevDiceArr.map(dice =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  function handleNewGame() {
    setDiceArr(generateAllNewDice());
    setTimer(0);
    setRolled(0);
  }

  useEffect(() => {
    if (gameWon) {
      btnNewGameRef.current && btnNewGameRef.current.focus();
      setGameInProgress(false);
    }
  }, [gameWon]);

  useEffect(() => {
    if (gameInProgress) {
      const counter = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);

      return () => clearInterval(counter);
    }
  }, [gameInProgress, timer]);

  return (
    <main className="main wrapper wrapper--flex">
      <section className="canvas">
        <div className="instructions" aria-live="polite">
          {gameWon ? (
            <p>
              Congratulations! You won!<br></br> Press "New Game" to start
              again.
            </p>
          ) : (
            <p>
              Roll until all dice are the same.<br></br> Click each die to
              freeze it at its current value between rolls.
            </p>
          )}
        </div>

        {gameWon && (
          <div aria-live="polite" className="score">
            <p>You took </p>
            <span className="time">{timer}s</span>
            <p>
              Rolled
              <span className="roll"> {rolled} </span>
              times!
            </p>
          </div>
        )}

        <Dice diceArr={diceArr} handleHeld={handleHeld} />

        {gameWon ? (
          <button
            className="btn btn-cta"
            onClick={handleNewGame}
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
    </main>
  );
}
