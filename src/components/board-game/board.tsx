import { GridType, Position } from "@/types";

type BoardProps = {
  grid: GridType;
  GRID_SIZE: number;
  CELL_SIZE: number;
  yellowTile: Position;
  blueTile: Position;
};

export default function Board({
  grid,
  GRID_SIZE,
  CELL_SIZE,
  yellowTile,
  blueTile,
}: BoardProps) {
  return (
    <div
      className="bg-white rounded-lg p-2"
      style={{
        width: GRID_SIZE * CELL_SIZE + 16,
        height: GRID_SIZE * CELL_SIZE + 16,
      }}
    >
      <div
        className="relative"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${colIndex}-${rowIndex}`}
              className={`absolute ${
                cell === "dark"
                  ? "bg-red-900 border border-red-900"
                  : "bg-white  border border-slate-400"
              }`}
              style={{
                left: colIndex * CELL_SIZE,
                top: rowIndex * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))
        )}

        {/* yellow tile */}
        <div
          className="absolute bg-yellow-400 rounded transition-all duration-150"
          style={{
            left: yellowTile.x * CELL_SIZE + 3,
            top: yellowTile.y * CELL_SIZE + 3,
            width: CELL_SIZE - 6,
            height: CELL_SIZE - 6,
          }}
        />

        {/* blue tile */}
        <div
          className="absolute bg-blue-600 rounded transition-all duration-150"
          style={{
            left: blueTile.x * CELL_SIZE + 3,
            top: blueTile.y * CELL_SIZE + 3,
            width: CELL_SIZE - 6,
            height: CELL_SIZE - 6,
          }}
        />
      </div>
    </div>
  );
}
