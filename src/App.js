import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";
import Game from "./game";

function App() {
  const [count, setCount] = useState(30);

  return (
    <>
      <h1 style={{ textAlign: "center", marginLeft: "8rem", color: "white" }}>
        Conway's "Game of Life"
      </h1>
      <Game count={count} setCount={setCount} />
    </>
  );
}

export default App;
