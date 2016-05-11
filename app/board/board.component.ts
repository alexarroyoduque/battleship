import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'bs-board',
  inputs: ['size', 'turns', 'phase', 'isIa'],
  directives: [CellComponent],
  providers: [BoardService],
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css']
})

export class BoardComponent implements OnInit {
  constructor(private boardService: BoardService) { }
  @Output() onAddShip = new EventEmitter<number>();
  @Output() turnsChange = new EventEmitter<number>();
  board: Board;
  phase;
  size;
  isIa;
  turns;

  ngOnInit() {
    console.log(this.isIa)
    this.board = {
      size: this.size,
      cells:this.boardService.generateCells(this.size)
    };
    if (this.isIa) {
      this.boardService.placeShip(this.board.cells, 2);
      this.boardService.placeShip(this.board.cells, 3);
      this.boardService.placeShip(this.board.cells, 4);
      this.boardService.placeShip(this.board.cells, 5);
    }
  }

  selectCell(cell) {
    if (this.phase === 'main') {
      console.log('main')
      // this.boardService.placeShip(this.board.cells, 2);
      this.onAddShip.emit(12);
    } else {
      this.turns++;
      this.turnsChange.emit(this.turns);
      this.boardService.shoot(cell);
    }
  }

  // onAddShip(ev) {
  //   console.log(ev);
  // }
}
