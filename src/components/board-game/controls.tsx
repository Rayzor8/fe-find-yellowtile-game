import React, { useCallback, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GridType } from "@/types";

type ControlsProps = {
  grid: GridType;
  GRID_SIZE: number;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  blueTile: { x: number; y: number };
  setBlueTile: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

export default function Controls({
  grid,
  GRID_SIZE,
  gameStarted,
  setGameStarted,
  gameOver,
  blueTile,
  setBlueTile,
}: ControlsProps) {
  function canMoveTo(x: number, y: number) {
    if (x < 0 || x >= GRID_SIZE) return false;
    if (y < 0 || y >= GRID_SIZE) return false;
    if (grid[y] && grid[y][x] === "dark") return false;

    return true;
  }
  function moveBlueTile(direction: string) {
    if (gameOver) return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    let newX = blueTile.x;
    let newY = blueTile.y;

    if (direction === "up") {
      newY = newY - 1;
    } else if (direction === "down") {
      newY = newY + 1;
    } else if (direction === "left") {
      newX = newX - 1;
    } else if (direction === "right") {
      newX = newX + 1;
    }

    if (canMoveTo(newX, newY)) {
      setBlueTile({ x: newX, y: newY });
    }
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent): void => {

      if (gameOver) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveBlueTile("up");
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveBlueTile("down");
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveBlueTile("left");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveBlueTile("right");
      }
    },
    
    [[gameOver, blueTile]]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver, blueTile]);

  return (
    <div className="flex-1 xl:flex-none flex flex-col justify-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        <button
          onClick={() => moveBlueTile("up")}
          className="bg-gray-500 px-auto hover:bg-gray-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50 col-start-2 cursor-pointer w-18 h-14 flex justify-center items-center"
          disabled={gameOver}
          aria-label="up"
        >
          <ChevronUp size={24} />
        </button>

        <button
          onClick={() => moveBlueTile("left")}
          className="bg-gray-500 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50 row-start-2 cursor-pointer w-18 h-14 flex justify-center items-center"
          disabled={gameOver}
          aria-label="left"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => moveBlueTile("right")}
          className="bg-gray-500 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50 row-start-2 col-start-3 cursor-pointer w-18 h-14 flex justify-center items-center"
          disabled={gameOver}
          aria-label="right"
        >
          <ChevronRight size={24} />
        </button>

        <button
          onClick={() => moveBlueTile("down")}
          className="bg-gray-500 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50 row-start-3 col-start-2 cursor-pointer w-18 h-14 flex justify-center items-center"
          disabled={gameOver}
          aria-label="down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}
