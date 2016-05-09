import { Component } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'bs-board',
  directives: [CellComponent], 
  templateUrl: 'app/board/board.component.html'
})
export class BoardComponent { }
