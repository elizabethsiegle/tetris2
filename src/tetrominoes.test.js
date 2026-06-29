// src/tetrominoes.test.js
import { describe, it, expect } from 'vitest';
import { PIECES, getPieceCells, spawnPiece, tryRotate } from './tetrominoes.js';
import { BOARD_COLS, BOARD_ROWS } from './constants.js';

describe('PIECES', () => {
  it('has 7 pieces with 4 rotations each', () => {
    for (const type of ['I', 'O', 'T', 'S', 'Z', 'J', 'L']) {
      expect(PIECES[type].shapes).toHaveLength(4);
      expect(PIECES[type].shapes[0]).toHaveLength(4); // each rotation has 4 cells
    }
  });

  it('I-piece rotation 0 is horizontal', () => {
    const cells = PIECES['I'].shapes[0];
    const rows = cells.map(([r]) => r);
    expect(new Set(rows).size).toBe(1); // all same row
  });

  it('O-piece all rotations are identical', () => {
    const [r0, r1, r2, r3] = PIECES['O'].shapes;
    expect(r0).toEqual(r1);
    expect(r0).toEqual(r2);
    expect(r0).toEqual(r3);
  });
});

describe('getPieceCells', () => {
  it('offsets cells by piece position', () => {
    const cells = getPieceCells('T', 0, 3, 5);
    // T rotation 0: [[0,1],[1,0],[1,1],[1,2]] + (5, 3)
    expect(cells).toContainEqual([5, 4]);  // [5+0, 3+1]
    expect(cells).toContainEqual([6, 3]);  // [5+1, 3+0]
  });
});

describe('spawnPiece', () => {
  it('spawns horizontally centered', () => {
    const { x, y, type, rotation } = spawnPiece('T');
    expect(type).toBe('T');
    expect(rotation).toBe(0);
    expect(x).toBe(3); // Math.floor((10-3)/2)
  });

  it('I-piece top cell is at board row 0', () => {
    const p = spawnPiece('I');
    const cells = getPieceCells(p.type, p.rotation, p.x, p.y);
    const minRow = Math.min(...cells.map(([r]) => r));
    expect(minRow).toBe(0);
  });
});

describe('tryRotate', () => {
  it('rotates T-piece in open space', () => {
    const board = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
    const result = tryRotate(board, 'T', 0, 4, 5);
    expect(result).not.toBeNull();
    expect(result.rotation).toBe(1);
  });

  it('returns null when all kick positions collide', () => {
    // Fill the entire board solid
    const board = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(1));
    const result = tryRotate(board, 'T', 0, 4, 5);
    expect(result).toBeNull();
  });
});
