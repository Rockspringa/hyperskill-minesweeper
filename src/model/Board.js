import getEmptyField from "../utils/EmptyField";
import getAdajacentIndexes from "../utils/GetAdajacentCells";

export default class Board {
  constructor({ rows = 8, cols = 9, bombs = 10, cells }) {
    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.length = this.rows * this.cols;

    this.cells = cells || getEmptyField(this.length);
  }

  #createBombsField(invulnerable) {
    const cells = getEmptyField(this.length);
    const cellsWithMines = [];

    let bombs = 0;
    while (bombs < this.bombs) {
      const index = Math.floor(Math.random() * this.length);

      if (!cells[index].hasBomb && index !== invulnerable) {
        cellsWithMines.push(cells[index]);
        cells[index].toPropagate = cellsWithMines;
        cells[index].hasBomb = true;
        bombs++;
      }
    }

    return cells;
  }

  #setAdjacentCells() {
    const adjacentCellsPerCell = [];

    for (let index = 0; index < this.length; index++) {
      adjacentCellsPerCell.push([]);
      for (const i of getAdajacentIndexes(index, this.length)) {
        adjacentCellsPerCell[index].push(this.cells[i]);
      }
    }

    for (let index = 0; index < this.length; index++) {
      this.cells[index].setAdjacentCells(adjacentCellsPerCell[index]);
    }
  }

  createField(rows, cols, bombs, firstMove) {
    const cellAffected = this.cells[firstMove];

    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.length = rows * cols;

    this.cells = this.#createBombsField(firstMove);
    this.cells[firstMove] = cellAffected;

    this.#setAdjacentCells();
  }

  isWinner() {
    return this.cells.every((cell) => cell.activated !== cell.hasBomb);
  }
}
