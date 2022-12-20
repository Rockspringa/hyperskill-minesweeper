import BoardCell from "../model/BoardCell";

const getEmptyField = (length) => {
  return Array.from({ length }, () => new BoardCell());
};

export default getEmptyField;
