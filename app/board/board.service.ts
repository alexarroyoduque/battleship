import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
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

  checkIfAnyCellsHasShip(boardCells, newShip): boolean {
    let cellHasPreviousShip: boolean = false,
        {x, y, units, orientation} = newShip;

    if (orientation === ORIENTATION.horizontal) {
      for(let i = 0; i < units; i++) {
        if (boardCells[y][x + i].hasShip) {
          cellHasPreviousShip = true;
        }
      }
    } else {
      for(let i = 0; i < units; i++) {
        if (boardCells[y + i][x].hasShip) {
          cellHasPreviousShip = true;
        }
      }
    }

    return cellHasPreviousShip;
  }


  insertShipOnBoard(boardCells, newShip): void {
    let {x, y, units, orientation} = newShip;

    if (orientation === ORIENTATION.horizontal) {
      for(let i = 0; i < units; i++) {
        boardCells[y][x + i].hasShip = true;
      }
    } else {
      for(let i = 0; i < units; i++) {
        boardCells[y + i][x].hasShip = true;
      }
    }
  }

  placeShipOnRandomPosition(boardCells, units: number) {
    const ORIENTATIONS = [ORIENTATION.vertical, ORIENTATION.horizontal];
    let orientation:string = ORIENTATIONS[getRandomInt(0, 1)],
        x: number = getRandomInt(0, this.getBoardSize() - units),
        y: number = getRandomInt(0, this.getBoardSize()- units),
        anyCellHasPreviousShip: boolean = false,
        newShip = {x, y, orientation, units};

    anyCellHasPreviousShip = this.checkIfAnyCellsHasShip(boardCells, newShip);

    if (!anyCellHasPreviousShip) {
      this.insertShipOnBoard(boardCells, newShip);
    } else {
      this.placeShipOnRandomPosition(boardCells, units);
    }
  }

  hasBoardEnoughtSize(newShip) {
    let {x, y, units, orientation} = newShip,
        boardHasEnoughtSize: boolean = false;
    if (orientation === ORIENTATION.horizontal) {
      if (x + units <= this.getBoardSize()) {
        boardHasEnoughtSize = true;
      }
    } else {
      if (y + units <= this.getBoardSize()) {
        boardHasEnoughtSize = true;
      }
    }

    return boardHasEnoughtSize;
  }

  addPlayerShip(boardCells, newShip) {
    let {x, y, units, orientation} = newShip,
        boardHasEnoughtSize: boolean = this.hasBoardEnoughtSize(newShip),
        anyCellHasPreviousShip: boolean = false;

    if (boardHasEnoughtSize) {
      anyCellHasPreviousShip = this.checkIfAnyCellsHasShip(boardCells, newShip);
    }

    if (!anyCellHasPreviousShip && boardHasEnoughtSize) {
      this.insertShipOnBoard(boardCells, newShip);
    } else {
      if(anyCellHasPreviousShip) {
        console.log('Ya hay un barco en estas celdas');
      } else {
        console.log('Espacio insuficiente');
      }
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
