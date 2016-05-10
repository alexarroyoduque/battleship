import { Component, OnInit } from '@angular/core';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { CellComponent } from '../cell/cell.component';

const BOARD_SIZE = 10;

@Component({
  selector: 'bs-board',
  directives: [CellComponent],
  providers: [BoardService],
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css']
})

export class BoardComponent implements OnInit {
  constructor(private boardService: BoardService) { }
  board: Board;
  ngOnInit() {
    this.board = {
      size: BOARD_SIZE,
      cells:this.boardService.generateCells(BOARD_SIZE)
    };
    this.boardService.placeShip(this.board.cells, 2);
    this.boardService.placeShip(this.board.cells, 3);
    this.boardService.placeShip(this.board.cells, 4);
    this.boardService.placeShip(this.board.cells, 5);
  }

  shoot(cell) {
    if (!cell.hasShip) {
      cell.status = 'water';
    } else {
      cell.status = 'hit';
    }
  }
}
