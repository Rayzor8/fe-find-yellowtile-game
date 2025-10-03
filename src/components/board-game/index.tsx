"use client";

import { useCallback, useEffect, useState } from "react";
import Board from "./board";
import Rules from "./rules";
import Info from "./info";
import Controls from "./controls";
import { CellType, GridType, Position } from "@/types";

const GRID_SIZE = 6;
const CELL_SIZE = 50;
const GAME_DURATION = 60;

export default function BoardGame() {
  const [grid, setGrid] = useState<GridType>([]);
  const [blueTile, setBlueTile] = useState<Position>({ x: 0, y: 5 });
  const [yellowTile, setYellowTile] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  const createInitialGrid = (): GridType => {
    const newGrid: GridType = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      const newRow: CellType[] = [];

      for (let col = 0; col < GRID_SIZE; col++) {
        newRow.push("white");
      }
      newGrid.push(newRow);
    }

    const darkTilePositions: [number, number][] = [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [1, 2],
      [1, 4],
      [4, 3],
      [4, 4],
    ];

    for (const [x, y] of darkTilePositions) {
      newGrid[y][x] = "dark";
    }

    return newGrid;
  };

  const moveYellowTile = useCallback(() => {
    const whiteCells: Position[] = [];
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 'white' && !(x === blueTile.x && y === blueTile.y)) {
          whiteCells.push({ x, y });
        }
      });
    });

    if (whiteCells.length > 0) {
      const randomCell = whiteCells[Math.floor(Math.random() * whiteCells.length)];
      setYellowTile(randomCell);
    }
  }, [grid, blueTile]);


  useEffect(() => {
    const newGrid = createInitialGrid();
    setGrid(newGrid);

    // find white cells to set yellow tile position
    const whiteCells: Position[] = [];
    newGrid.forEach((row, indexY) => {
      row.forEach((cell, indexX) => {
        if (cell === "white" && !(indexX === 0 && indexY === 5)) {
          whiteCells.push({ x: indexX, y: indexY });
        }
      });
    });

    // set yellow tile
    if (whiteCells.length > 0) {
      const randomIndex =
        whiteCells[Math.floor(Math.random() * whiteCells.length)];
        
      setYellowTile(randomIndex);
    }
  }, []);

  useEffect(() => {
    // effect handling game timer
    if (!gameStarted) return;
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);

  useEffect(() => {
    // trigger when blue tile and yellow tile are in the same position
    const isSamePosition =
      blueTile.x === yellowTile.x && blueTile.y === yellowTile.y;

    if (isSamePosition && gameStarted && !gameOver) {
      setScore((prevScore) => prevScore + 1);
      moveYellowTile();
    }
  }, [blueTile.x, blueTile.y ]);

  return (
    <section className="flex flex-col items-center justify-start  min-h-screen py-6">
      <Board
        GRID_SIZE={GRID_SIZE}
        CELL_SIZE={CELL_SIZE}
        grid={grid}
        yellowTile={yellowTile}
        blueTile={blueTile}
      />
      <Info score={score} timeLeft={timeLeft} />
      <Rules gameStarted={gameStarted} gameOver={gameOver} />
      <Controls
        grid={grid}
        GRID_SIZE={GRID_SIZE}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        gameOver={gameOver}
        blueTile={blueTile}
        setBlueTile={setBlueTile}
      />
    </section>
  );
}
