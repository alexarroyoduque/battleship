import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  size: number = 10;
  generateCells(size) {
    this.size = size;
    let board = new Array();

    for(let i = 0; i < size; i++) {
      board.push([]);
      board[i].push([]);
      for(let j = 0; j < size; j++) {
        board[i][j] = {
          status: 'empty',
          hasShip: false,
          coordinates: {x: String.fromCharCode(65 + i), y: j}
        };
      }
    }
    return board;
  }

  getBoardSize(): number {
    return this.size;
  }

  placeShip(throws, shipSize: number) {
    const ORIENTATIONS = ['horizontal', 'vertical'];
    let orientation:string = ORIENTATIONS[getRandomInt(0, 1)],
        x: number,
        y: number;

    x = getRandomInt(0, this.getBoardSize() - shipSize);
    y = getRandomInt(0, this.getBoardSize()- shipSize);

    if (orientation === 'horizontal') {
      for(let i = 0; i < shipSize; i++) {
        throws[x + i][y].hasShip = true;
      }
    } else {
      for(let i = 0; i < shipSize; i++) {
        throws[x][y + i].hasShip = true;
      }
    }
  }
}

function getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
