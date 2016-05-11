import { Injectable } from '@angular/core';
import { Cell } from '../cell/cell';
import { ORIENTATION } from './orientation';

@Injectable()
export class BoardService {
  size: number;

  generateCells(size) {
    this.size = size;
    let board = new Array();

    for(let i = 0; i < size; i++) {
      board.push([]);
      board[i].push([]);
      for(let j = 0; j < size; j++) {
        // board[i][j] = new Cell ('empty', false, {x: String.fromCharCode(65 + i), y: j});
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

  placeShip(boardCells, shipSize: number) {
    const ORIENTATIONS = [ORIENTATION.vertical, ORIENTATION.horizontal];
    let orientation:string = ORIENTATIONS[getRandomInt(0, 1)],
        x: number,
        y: number,
        cellHasPreviousShip: boolean = false;

    x = getRandomInt(0, this.getBoardSize() - shipSize);
    y = getRandomInt(0, this.getBoardSize()- shipSize);

    if (orientation === ORIENTATION.horizontal) {
      for(let i = 0; i < shipSize; i++) {
        if (boardCells[x + i][y].hasShip) {
          cellHasPreviousShip = true;
        }
      }
    } else {
      for(let i = 0; i < shipSize; i++) {
        if (boardCells[x][y + i].hasShip) {
          cellHasPreviousShip = true;
        }
      }
    }

    if (!cellHasPreviousShip) {
      if (orientation === ORIENTATION.horizontal) {
        for(let i = 0; i < shipSize; i++) {
          boardCells[x + i][y].hasShip = true;
        }
      } else {
        for(let i = 0; i < shipSize; i++) {
          boardCells[x][y + i].hasShip = true;
        }
      }
    } else {
      this.placeShip(boardCells, shipSize);
    }
  }

  shoot(cell) {
    if (!cell.hasShip) {
      cell.status = 'water';
    } else {
      cell.status = 'hit';
    }
  }
}

function getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
