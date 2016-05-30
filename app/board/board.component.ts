import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MissionService } from '../shared/mission.service';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { CellComponent } from '../cell/cell.component';
import { PHASE } from '../modes/phase';

@Component({
  selector: 'bs-board',
  inputs: ['size', 'turns', 'phase', 'isIa'],
  directives: [CellComponent],
  providers: [BoardService],
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css']
})

export class BoardComponent implements OnInit {
  @Output() turnsChange = new EventEmitter<number>();
  cellsStack = [];
  board: Board;
  phase;
  size;
  isIa;
  turns;

  subscription:Subscription;
  subscriptionShoot:Subscription;
  constructor(private boardService: BoardService, private missionService: MissionService) {
    this.subscription = missionService.addShipAnnounced$.subscribe(
      (newShip) => {
        if (this.phase === PHASE.main && !this.isIa) {
          let result = this.boardService.addPlayerShip(this.board.cells, newShip);
          this.missionService.confirmAddShip(result);
          console.log(`addShipAnnounced desde board`)
        }
    });

    this.subscriptionShoot = missionService.shootAnnounced$.subscribe(
      (coordinates) => {
        if (this.phase === PHASE.battle && !this.isIa) {
          this.boardService.shoot(this.getCellByCoordinates(coordinates));
        }
    });
  }

  ngOnInit() {
    this.board = {
      size: this.size,
      cells:this.boardService.generateCells(this.size)
    };
    if (this.isIa) {
      this.boardService.placeShipOnRandomPosition(this.board.cells, 5);
      this.boardService.placeShipOnRandomPosition(this.board.cells, 4);
      this.boardService.placeShipOnRandomPosition(this.board.cells, 3);
      this.boardService.placeShipOnRandomPosition(this.board.cells, 2);
    }
  }

  getCellByCoordinates(coordinates) {
    let {x, y} = coordinates;

    return this.board.cells[x][y];
  }

  isIaTurn(turns) {
    return !!(turns % 2);
  }

  selectCell(cell) {
    if (this.phase === PHASE.main) {
      console.log('main')
      // this.boardService.placeShipOnRandomPosition(this.board.cells, 2);
    } else if (this.phase === PHASE.battle && this.isIa && this.isIaTurn(this.turns)){
      this.turns++;
      this.turnsChange.emit(this.turns);
      this.boardService.shoot(cell);
    }
  }

  getLetterCode(code) {
    return String.fromCharCode(65 + code);
  }

}
