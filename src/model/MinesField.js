export default class MinesField {
  #emptyField = Array.from({ length: 72 }, () => ({
    hasBomb: false,
    activated: false,
    bombsAround: 0,
  }));

  constructor({ rows = 8, cols = 9, bombs = 10, field }) {
    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.length = this.rows * this.cols;

    this.field = [...(field || this.#emptyField)];
  }

  #forEachCellAround(index, length, callback) {
    const valuesToGetIndexes = [-9, -8, -7, -1, 1, 7, 8, 9];

    for (const value of valuesToGetIndexes) {
      const indexCounter = index + value;
      const col = index % 8;

      if (indexCounter < 0 || length <= indexCounter) {
        continue;
      }
      if (col === 0 && [-9, -1, 7].includes(value)) {
        continue;
      }
      if (col === 7 && [-7, 1, 9].includes(value)) {
        continue;
      }

      callback(indexCounter);
    }
  }

  #createBombsField(invulnerable) {
    const cellBombs = [...this.#emptyField];

    let bombs = 0;
    while (bombs < this.bombs) {
      const index = Math.floor(Math.random() * this.length);

      if (!cellBombs[index].hasBomb && index !== invulnerable) {
        cellBombs[index].hasBomb = true;
        bombs++;
      }
    }

    return cellBombs;
  }

  #setBombsAroundPerCell() {
    this.field.forEach(({ hasBomb }, index) => {
      if (!hasBomb) {
        return;
      }

      this.#forEachCellAround(
        index,
        this.length,
        (i) => this.field[i].bombsAround++
      );
    });
  }

  #activateMines() {
    for (const cell of this.field) {
      if (cell.activated || !cell.hasBomb) continue;
      cell.activated = true;
    }
  }

  #stepOnSafeCell(index) {
    const { hasBomb, bombsAround, activated } = this.field[index];

    if (hasBomb || activated) {
      return true;
    }

    this.field[index].activated = true;

    return !!bombsAround;
  }

  #propagate(cellFired) {
    const cellsToLookAround = [cellFired];
    for (const index of cellsToLookAround) {
      this.#forEachCellAround(
        index,
        this.length,
        (i) => this.#stepOnSafeCell(i) || cellsToLookAround.push(i)
      );
    }
  }

  createField(rows, cols, bombs, firstMove) {
    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.length = rows * cols;

    this.field = this.#createBombsField(firstMove);

    this.#setBombsAroundPerCell();
  }

  stepOnCell(index) {
    const { hasBomb, bombsAround } = this.field[index];

    if (hasBomb) {
      this.#activateMines();
      return;
    }

    this.field[index].activated = true;

    if (!bombsAround) {
      this.#propagate(index);
    }
  }

  isWinner() {
    return this.field.every(
      (cell) => cell.activated || (cell.hasBomb && !cell.activated)
    );
  }
}
