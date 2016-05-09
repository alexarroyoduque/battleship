import { Component } from '@angular/core';
import { Board } from '../board/board';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'bs-board',
  directives: [CellComponent],
  templateUrl: 'app/board/board.component.html'
})

export class BoardComponent {
  board: Board = {
    throws: generateCells()
  }
}

function generateCells() {
  let numberOfColumns = 10,
    board = new Array();

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
  // console.log(board);
  return board;
}
