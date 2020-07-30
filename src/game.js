import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { FaPlay } from "react-icons/fa";
import {
  GiCardRandom,
  GiNuclearBomb,
  GiSupersonicBullet,
  GiSnail,
} from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
var counter = 0;
var timer = 100;

function Game({ count, setCount }) {
  const [number, setNumber] = useState(25);
  let numRows = 25;
  let numCols = 25;
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  };
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const [color, setColor] = useState("pink");

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setCount((c) => count + 1);
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(function (timer) {
      runSimulation();
    }, timer);
    counter++;
  }, [counter++]);
  console.log(counter);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-evenly",
          margin: "1rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "space-between",
            marginTop: "8rem",
          }}
        >
          <h2 style={{ textAlign: "center", color: "white" }}>Controls:</h2>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={(e) => {
              e.preventDefault();
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            <FaPlay /> {running ? "stop" : "start"}
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            <GiCardRandom size="2em" /> random
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              setGrid(generateEmptyGrid());
              counter = 0;
            }}
          >
            <GiNuclearBomb size="2em" /> clear
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              setColor("green");
            }}
          >
            {" "}
            <IoIosColorPalette size="2em" />
            Click here for green
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              setColor("red");
            }}
          >
            {" "}
            <IoIosColorPalette size="2em" />
            Click here for red
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              setColor("blue");
            }}
          >
            {" "}
            <IoIosColorPalette size="2em" />
            Click here for blue
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              timer = 10;
            }}
          >
            {" "}
            <GiSupersonicBullet size="1.8em" /> Go super fast
          </button>
          <button
            style={{
              margin: ".5rem",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              timer = 1000;
            }}
          >
            {" "}
            <GiSnail size="1.8em" /> Go super slow
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${number}, auto)`,
            // gridTemplateRows: `repeat(${number}, 1fr)`,
            width: "700px",
            height: "700px",
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? color : undefined,
                  border: "solid 1px white",
                }}
              />
            ))
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            width: "15%",
            marginTop: "10rem",
            color: "white",
          }}
        >
          <div>
            <h3>Generation</h3>
            <h4>{counter - 2}</h4>
          </div>
          <p>
            Welcome to John Conway's "Game of Life"! This is a computer science
            classic from 1970, a program that simulates a cellular automaton
            (plural automata). It has connections to all kinds of different
            aspects of computer science and nature.
          </p>
          <h3>Rules</h3>
          <li>Any live cell with two or three live neighbours survives.</li>
          <li>Any dead cell with three live neighbours becomes a live cell.</li>
          <li>
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </li>
        </div>
      </div>
    </>
  );
}

export default Game;
