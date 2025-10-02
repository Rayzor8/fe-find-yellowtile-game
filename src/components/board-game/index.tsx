"use client";

import { useEffect, useState } from "react";
import Board from "./board";
import Footer from "./footer";
import Info from "./info";
import Keyboard from "./controls";
import { CellType, GridType, Position } from "@/types";

const GRID_SIZE = 6;
const CELL_SIZE = 60;
const GAME_DURATION = 60;

export default function BoardGame() {
  const [grid, setGrid] = useState<GridType>([]);
  const [blueTile, setBlueTile] = useState<Position>({ x: 0, y: 5 });
  const [yellowTile, setYellowTile] = useState<Position>({ x: 0, y: 0 });
  
  console.log(grid);
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
      const randomCell =
        whiteCells[Math.floor(Math.random() * whiteCells.length)];
      setYellowTile(randomCell);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-start min-h-screen py-4">
      <Board
        GRID_SIZE={GRID_SIZE}
        CELL_SIZE={CELL_SIZE}
        grid={grid}
        yellowTile={yellowTile}
        blueTile={blueTile}
      />
      <Info />
      <Keyboard />
      <Footer />
    </section>
  );
}
