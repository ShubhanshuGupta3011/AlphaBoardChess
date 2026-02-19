import { useState } from "react";
import "./App.css";

const screen = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

const rightSide = ["+", "-", "*", "/", "="];
const topSide = ["AC", "+/-", "%"];

function App() {

  const [display, setDisplay] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(null);
  const [operation, setOperation] = useState(null);

  function clear() {
    setA(0);
    setB(null);
    setOperation(null);
  }

  function calculated() {
    if (operation === null || b === null) return;

    let numa = Number(a);
    let numb = Number(b);
    let result = "";

    if (operation === "+") result = numa + numb;
    else if (operation === "-") result = numa - numb;
    else if (operation === "*") result = numa * numb;
    else result = numa / numb;

    if (result === Infinity) result = "";

    setDisplay(String(result));
    setA(String(result));
    setB(null);
    setOperation(null);
  }

  function handleClick(item) {

    // TOP BUTTONS
    if (topSide.includes(item)) {

      if (item === "AC") {
        clear();
        setDisplay("");
        return;
      }

      if (item === "+/-") {
        if (display === "0") return;

        const newVal =
          display[0] === "-" ? display.slice(1) : "-" + display;

        setDisplay(newVal);

        if (operation !== null) setB(newVal);
        else setA(newVal);

        return;
      }

      // %
      const percent = String(Number(display) / 100);
      setDisplay(percent);
      clear();
      setA(percent);
      return;
    }

    // OPERATORS
    if (rightSide.includes(item)) {

      if (item === "=") {
        calculated();
        return;
      }

      if (operation !== null && b !== null) {
        calculated();
      }

      setOperation(item);
      setDisplay("");
      return;
    }

    // NUMBERS
    let newDisplay = "";

    if (display === "0" && item !== ".") {
      newDisplay = item;
    } else {
      if (display.includes(".") && item === ".") return;
      newDisplay = display + item;
    }

    setDisplay(newDisplay);

    if (operation === null) setA(newDisplay);
    else setB(newDisplay);
  }

  return (
    <div className="App">
      <input id="display" value={display} readOnly />

      {screen.map((item) => (
        <button
          key={item}
          style={{
            ...(item === "0" ? { width: "50%" } : {}),
            ...(rightSide.includes(item)
              ? { backgroundColor: "#ff9500" }
              : {}),
            ...(topSide.includes(item)
              ? { backgroundColor: "#d4d4d2" }
              : {}),
          }}
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default App;
