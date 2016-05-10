import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'bs-board',
  inputs: ['size', 'turns'],
  outputs: ['turns'],
  directives: [CellComponent],
  providers: [BoardService],
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css']
})

export class BoardComponent implements OnInit {
  constructor(private boardService: BoardService) { }
  board: Board;
  size;
  turns;

  ngOnInit() {
    this.board = {
      size: this.size,
      cells:this.boardService.generateCells(this.size)
    };
    this.boardService.placeShip(this.board.cells, 2);
    this.boardService.placeShip(this.board.cells, 3);
    this.boardService.placeShip(this.board.cells, 4);
    this.boardService.placeShip(this.board.cells, 5);
  }

  shoot(cell) {
    this.turns++;
    this.boardService.shoot(cell);
  }
}
