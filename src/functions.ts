type BoardTile = {
  row: number;
  column: number;
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  exploded: boolean;
  nearMines: number;
};

const createBoard = (rows: number, columns: number) => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((__, column) => {
          return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
};

const spreadMines = (board: BoardTile[][], minesAmount: number) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowToMine = Math.round(Math.random() * rows);
    const columnToMine = Math.round(Math.random() * columns);

    if (!board[rowToMine][columnToMine].mined) {
      board[rowToMine][columnToMine].mined = true;
      minesPlanted++;
    }
  }
};

export const createMinedBoard = (
  rows: number,
  columns: number,
  minesAmount: number,
) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};
