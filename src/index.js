const boxConflict = (matrix, row, col, num) => {
  let startRow, endRow, startCol, endCol;

  if (row >= 0 && row < 3) {
    startRow = 0;
    endRow = 3;
  } else if (row >= 3 && row < 6) {
    startRow = 3;
    endRow = 6;
  } else if (row >= 6 && row < 9) {
    startRow = 6;
    endRow = 9;
  }

  if (col >= 0 && col < 3) {
    startCol = 0;
    endCol = 3;
  } else if (col >= 3 && col < 6) {
    startCol = 3;
    endCol = 6;
  } else if (col >= 6 && col < 9) {
    startCol = 6;
    endCol = 9;
  }

  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (matrix[i][j] === num) {
        return true;
      }
    }
  }

  return false;
};

const rowAndColConflict = (matrix, row, col, num) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const element = matrix[i][j];

      if (i === row) {
        if (element === num) {
          return true;
        }
      }

      if (j === col) {
        if (element === num) {
          return true;
        }
      }
    }
  }

  return false;
};

const zeroLocation = matrix => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        return [i, j];
      }
    }
  }

  return [];
};

const localSolveSudoku = (matrix, row, col) => {
  const cell = zeroLocation(matrix);

  if (!cell.length) {
    return matrix;
  }

  row = cell[0];
  col = cell[1];

  for (let num = 1; num <= 9; num++) {
    const hasConflict = rowAndColConflict(matrix, row, col, num) || boxConflict(matrix, row, col, num);

    if (!hasConflict) {
      matrix[row][col] = num;

      if (localSolveSudoku(matrix, row, col)) {
        return matrix;
      }

      matrix[row][col] = 0;
    }
  }

  return;
};

module.exports = function solveSudoku(matrix) {
  return localSolveSudoku(matrix);
};