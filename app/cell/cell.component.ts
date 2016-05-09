import { Component, Input } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'bs-cell',
  templateUrl: 'app/cell/cell.component.html',
  styleUrls: ['app/cell/cell.component.css']
})
export class CellComponent {
  @Input()
  cell: Cell;
}
