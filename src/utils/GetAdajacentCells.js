const valuesToGetIndexes = [-9, -8, -7, -1, 1, 7, 8, 9];
const leftIndexes = [-9, -1, 7];
const rightIndexes = [-7, 1, 9];

const getAdajacentCells = (index, length) => {
  const indexes = [];

  for (const value of valuesToGetIndexes) {
    const indexCounter = index + value;
    const col = index % 8;

    if (indexCounter < 0 || length <= indexCounter) {
      continue;
    }
    if (col === 0 && leftIndexes.includes(value)) {
      continue;
    }
    if (col === 7 && rightIndexes.includes(value)) {
      continue;
    }

    indexes.push(indexCounter);
  }

  return indexes;
};

export default getAdajacentCells;
