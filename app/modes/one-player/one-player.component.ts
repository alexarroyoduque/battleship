import { Component, Output, EventEmitter } from '@angular/core';
import { BoardComponent } from '../../board/board.component';
import { IaComponent } from '../../ia/ia.component';
import { ORIENTATION } from '../../board/orientation';
import { PHASE } from '../phase';

@Component({
  selector: 'bs-one-player',
  directives: [BoardComponent, IaComponent],
  templateUrl: 'app/modes/one-player/one-player.component.html'
})
export class OnePlayerComponent {
  boardSize: number = 10;
  turns: number = 0;
  orientation: string = ORIENTATION.vertical;
  phase: string = PHASE.main;
  units: number = 5;
  addTurn() {
    this.turns++;
  }

  // addShip(x, y, orientation) {
  //   this.onAddShip.emit({x, y, orientation});
  // }
  onAddShip() {
    console.log('probando');
  }

  changeOrientation() {
    if (this.orientation === ORIENTATION.vertical) {
      this.orientation = ORIENTATION.horizontal;
    } else {
      this.orientation = ORIENTATION.vertical;
    }
  }
}
