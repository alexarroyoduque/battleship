import { Component } from '@angular/core';
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

export class BoardComponent {
  constructor(private boardService: BoardService) { }

  board: Board = {
    throws: this.boardService.generateCells(10)
  }

  shoot(cell) {
    console.log(cell);
  }
}
