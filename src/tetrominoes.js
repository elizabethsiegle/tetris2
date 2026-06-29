import { BOARD_COLS, BOARD_ROWS } from './constants.js';

// Each piece: 4 rotation states, each state = array of [row, col] offsets from bounding-box origin
export const PIECES = {
  I: {
    color: 1, size: 4,
    shapes: [
      [[1,0],[1,1],[1,2],[1,3]],
      [[0,2],[1,2],[2,2],[3,2]],
      [[2,0],[2,1],[2,2],[2,3]],
      [[0,1],[1,1],[2,1],[3,1]],
    ],
  },
  O: {
    color: 2, size: 2,
    shapes: [
      [[0,0],[0,1],[1,0],[1,1]],
      [[0,0],[0,1],[1,0],[1,1]],
      [[0,0],[0,1],[1,0],[1,1]],
      [[0,0],[0,1],[1,0],[1,1]],
    ],
  },
  T: {
    color: 3, size: 3,
    shapes: [
      [[0,1],[1,0],[1,1],[1,2]],
      [[0,1],[1,1],[1,2],[2,1]],
      [[1,0],[1,1],[1,2],[2,1]],
      [[0,1],[1,0],[1,1],[2,1]],
    ],
  },
  S: {
    color: 4, size: 3,
    shapes: [
      [[0,1],[0,2],[1,0],[1,1]],
      [[0,1],[1,1],[1,2],[2,2]],
      [[1,1],[1,2],[2,0],[2,1]],
      [[0,0],[1,0],[1,1],[2,1]],
    ],
  },
  Z: {
    color: 5, size: 3,
    shapes: [
      [[0,0],[0,1],[1,1],[1,2]],
      [[0,2],[1,1],[1,2],[2,1]],
      [[1,0],[1,1],[2,1],[2,2]],
      [[0,1],[1,0],[1,1],[2,0]],
    ],
  },
  J: {
    color: 6, size: 3,
    shapes: [
      [[0,0],[1,0],[1,1],[1,2]],
      [[0,1],[0,2],[1,1],[2,1]],
      [[1,0],[1,1],[1,2],[2,2]],
      [[0,1],[1,1],[2,0],[2,1]],
    ],
  },
  L: {
    color: 7, size: 3,
    shapes: [
      [[0,2],[1,0],[1,1],[1,2]],
      [[0,1],[1,1],[2,1],[2,2]],
      [[1,0],[1,1],[1,2],[2,0]],
      [[0,0],[0,1],[1,1],[2,1]],
    ],
  },
};

// SRS wall kick offsets [dx, dy] — dx=col delta, dy=row delta (positive = down)
// Derived from SRS spec with row-axis flipped to match board coordinates (row 0 = top)
const JLSTZ_KICKS = {
  '0->1': [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  '1->0': [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  '1->2': [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  '2->1': [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  '2->3': [[0,0],[1,0],[1,-1],[0,2],[1,2]],
  '3->2': [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  '3->0': [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  '0->3': [[0,0],[1,0],[1,-1],[0,2],[1,2]],
};

const I_KICKS = {
  '0->1': [[0,0],[-2,0],[1,0],[-2,1],[1,-2]],
  '1->0': [[0,0],[2,0],[-1,0],[2,-1],[-1,2]],
  '1->2': [[0,0],[-1,0],[2,0],[-1,-2],[2,1]],
  '2->1': [[0,0],[1,0],[-2,0],[1,2],[-2,-1]],
  '2->3': [[0,0],[2,0],[-1,0],[2,-1],[-1,2]],
  '3->2': [[0,0],[-2,0],[1,0],[-2,1],[1,-2]],
  '3->0': [[0,0],[1,0],[-2,0],[1,2],[-2,-1]],
  '0->3': [[0,0],[-1,0],[2,0],[-1,-2],[2,1]],
};

export const WALL_KICKS = { I: I_KICKS, JLSTZ: JLSTZ_KICKS };

// Absolute board [row, col] for each cell of a piece
export function getPieceCells(type, rotation, x, y) {
  return PIECES[type].shapes[rotation].map(([dr, dc]) => [y + dr, x + dc]);
}

// Check if a piece at (x, y, rotation) collides with walls or locked cells
export function collides(board, type, rotation, x, y) {
  return getPieceCells(type, rotation, x, y).some(([r, c]) =>
    c < 0 || c >= BOARD_COLS || r >= BOARD_ROWS || (r >= 0 && board[r][c] !== 0)
  );
}

// Compute the Y position where the piece would land (ghost piece row)
export function computeGhostY(board, type, rotation, x, y) {
  let gy = y;
  while (!collides(board, type, rotation, x, gy + 1)) gy++;
  return gy;
}

// Spawn piece at top center; y offset so topmost cell aligns with board row 0
export function spawnPiece(type) {
  const { size, shapes } = PIECES[type];
  const minRow = Math.min(...shapes[0].map(([r]) => r));
  return {
    type,
    rotation: 0,
    x: Math.floor((BOARD_COLS - size) / 2),
    y: -minRow,
  };
}

// Try clockwise rotation with SRS wall kicks; returns new {rotation,x,y} or null
export function tryRotate(board, type, rotation, x, y) {
  const next = (rotation + 1) % 4;
  const table = type === 'I' ? I_KICKS : JLSTZ_KICKS;
  const offsets = table[`${rotation}->${next}`] ?? [[0, 0]];
  for (const [dx, dy] of offsets) {
    if (!collides(board, type, next, x + dx, y + dy)) {
      return { rotation: next, x: x + dx, y: y + dy };
    }
  }
  return null;
}
