import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { CellComponent } from '../cell/cell.component';
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'bs-board',
  inputs: ['size', 'turns', 'phase', 'isIa'],
  directives: [CellComponent],
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css']
})

export class BoardComponent implements OnInit {
  @Output() onAddShip = new EventEmitter<number>();
  @Output() turnsChange = new EventEmitter<number>();
  board: Board;
  phase;
  size;
  isIa;
  turns;

  subscription:Subscription;
  constructor(private boardService: BoardService) {
    this.subscription = boardService.addShipAnnounced$.subscribe(
      (newShip) => {
        console.log(`addShipAnnounced desde board`)
        this.boardService.addPlayerShip(this.board.cells, newShip);
        console.log(newShip.x)
        console.log(newShip.y)
        console.log(newShip.units)
        console.log(newShip.orientation)
        // console.log(this.board.cells);
    })
  }
  confirm() {
    console.log('confirm()')
    this.boardService.confirmAddShip('barco');
  }

  ngOnInit() {
    this.board = {
      size: this.size,
      cells:this.boardService.generateCells(this.size)
    };
    if (this.isIa) {
      // this.boardService.placeShipOnRandomPosition(this.board.cells, 5);
      // this.boardService.placeShipOnRandomPosition(this.board.cells, 5);
      // this.boardService.placeShipOnRandomPosition(this.board.cells, 5);
      // this.boardService.placeShipOnRandomPosition(this.board.cells, 5);
    }
  }

  selectCell(cell) {
    if (this.phase === 'mlklkain') {
      console.log('main')
      // this.boardService.placeShipOnRandomPosition(this.board.cells, 2);
    } else {
      // this.turns++;
      // this.turnsChange.emit(this.turns);
      this.boardService.shoot(cell);
    }
  }

  // onAddShip(ev) {
  //   console.log(ev);
  // }
}
