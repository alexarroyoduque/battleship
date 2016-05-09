import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  generateCells(numberOfColumns) {
    let board = new Array();

    for(let i = 0; i < numberOfColumns; i++) {
      board.push([]);
      board[i].push([]);
      for(let j = 0; j < numberOfColumns; j++) {
        board[i][j] = {
          status: 'empty',
          hasShip: false,
          coordinates: {x: String.fromCharCode(65 + i), y: j}
        };
      }
    }
    return board;
  }
}
