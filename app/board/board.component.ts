import { Component, OnInit } from '@angular/core';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { CellComponent } from '../cell/cell.component';

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
    this.board = {throws:this.boardService.generateCells(10)};
    this.boardService.placeShip(this.board.throws, 2);
    this.boardService.placeShip(this.board.throws, 3);
    this.boardService.placeShip(this.board.throws, 4);
    this.boardService.placeShip(this.board.throws, 5);
  }

  shoot(cell) {
    if (!cell.hasShip) {
      cell.status = 'water';
    } else {
      cell.status = 'hit';
    }
  }
}
