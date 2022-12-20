import cellStates from "./CellStates";

export default class BoardCell {
  constructor() {
    this.state = cellStates.default;
    this.hasBomb = false;
    this.bombsAround = "";
    this.toPropagate = [];
  }

  get activated() {
    return [cellStates.activated, cellStates.exploded].includes(this.state);
  }

  get bombs() {
    return this.state === cellStates.activated ? this.bombsAround : "";
  }

  #propagate() {
    for (const cell of this.toPropagate) {
      cell.activate();
    }
  }

  flag() {
    if (this.state !== cellStates.default) {
      return false;
    }
    this.state = cellStates.flagged;
    return true;
  }

  unflag() {
    if (this.state !== cellStates.flagged) {
      return false;
    }
    this.state = cellStates.default;
    return true;
  }

  activate() {
    if (this.state !== cellStates.default) {
      return;
    }

    this.state = this.hasBomb ? cellStates.exploded : cellStates.activated;

    if (this.hasBomb || !this.bombsAround) {
      this.#propagate();
    }
  }

  setAdjacentCells(adjacentCells) {
    if (this.hasBomb || !adjacentCells.length) return;

    this.bombsAround =
      adjacentCells.reduce((bombs, cell) => bombs + cell.hasBomb, 0) || "";

    if (this.bombsAround) return;

    this.toPropagate = adjacentCells.filter((cell) => !cell.hasBomb);
  }
}
