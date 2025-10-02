export type CellType = "white" | "dark";
export type GridType = CellType[][]; 
export type Direction = "up" | "down" | "left" | "right";

export interface Position {
  x: number;
  y: number;
}

