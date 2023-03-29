export type BoardTile = {
  row: number;
  column: number;
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  exploded: boolean;
  nearMines: number;
};

export type Board = BoardTile[][];

type SelectedBoardTileProps = {
  board: Board;
  row: number;
  column: number;
};

const createBoard = (rows: number, columns: number): Board => {
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

const spreadMines = (board: Board, minesAmount: number) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowToMine = Math.round(Math.random() * rows);
    const columnToMine = Math.round(Math.random() * columns);

    if (
      board[rowToMine] &&
      board[rowToMine][columnToMine] &&
      !board[rowToMine][columnToMine].mined
    ) {
      board[rowToMine][columnToMine].mined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (
  rows: number,
  columns: number,
  minesAmount: number,
) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

const cloneBoard = (board: Board) => {
  return board.map(rows => {
    return rows.map(field => {
      return { ...field };
    });
  });
};

const getNeighbors = ({ board, row, column }: SelectedBoardTileProps) => {
  const neighbors: BoardTile[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  rows.forEach(r => {
    columns.forEach(c => {
      const different = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;

      if (different && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

const safeNeighborhood = ({ board, row, column }: SelectedBoardTileProps) => {
  const safes = (result: boolean, neighbor: BoardTile) =>
    result && !neighbor.mined;

  return getNeighbors({ board, row, column }).reduce(safes, true);
};

const openField = ({ board, row, column }: SelectedBoardTileProps) => {
  const field = board[row][column];

  if (field.opened) {
    return;
  }

  field.opened = true;

  if (field.mined) {
    field.exploded = true;
  } else {
    const neighbors = getNeighbors({ board, row, column });
    if (safeNeighborhood({ board, row, column })) {
      neighbors.forEach(n =>
        openField({ board, row: n.row, column: n.column }),
      );
    } else {
      field.nearMines = neighbors.filter(n => n.mined).length;
    }
  }
};

const fields = (board: Board) => {
  const tileArray: BoardTile[] = [];
  board.forEach(rows => {
    rows.forEach(field => {
      tileArray.push(field);
    });
  });
  return tileArray;
};

const hasExplosion = (board: Board) =>
  fields(board).filter(field => field.exploded).length > 0;

const pending = (field: BoardTile) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);
const wonGame = (board: Board) => fields(board).filter(pending).length === 0;

const showMines = (board: Board) =>
  fields(board)
    .filter(field => field.mined)
    .forEach(field => (field.opened = true));

export {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines,
};
