import { Component } from '@angular/core';
import { BoardComponent } from '../../board/board.component';

@Component({
  selector: 'bs-one-player',
  directives: [BoardComponent],
  templateUrl: 'app/modes/one-player/one-player.component.html'
})
export class OnePlayerComponent {
  turns = {
    a: 0
  }
  addTurn() {
    this.turns.a++;
  }
}
