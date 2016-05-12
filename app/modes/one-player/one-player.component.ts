import { Component, Output, EventEmitter } from '@angular/core';
import { MissionService } from '../../shared/mission.service';
import { BoardComponent } from '../../board/board.component';

import { IaComponent } from '../../ia/ia.component';
import { ORIENTATION } from '../../board/orientation';
import { PHASE } from '../phase';

@Component({
  selector: 'bs-one-player',
  directives: [BoardComponent, IaComponent],
  providers: [MissionService],
  templateUrl: 'app/modes/one-player/one-player.component.html'
})
export class OnePlayerComponent {
  boardSize: number = 10;
  turns: number = 0;
  orientation: string = ORIENTATION.vertical;
  phase: string = PHASE.main;
  units: number = 5;
  //
  constructor(private missionService: MissionService) {
    missionService.addShipConfirmed$.subscribe(
      ship => {
        console.log(`Esta es la confirmacion desde one-player ${ship}`)
      })
  }
  announce(x, y, units, orientation) {
    console.log('announce()')
    let xParsed = x.charCodeAt(0) - 65,
        yParsed = parseInt(y);

    this.missionService.announceAddShip({x: xParsed, y: yParsed, units, orientation});
  }

  addTurn() {
    this.turns++;
  }

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
