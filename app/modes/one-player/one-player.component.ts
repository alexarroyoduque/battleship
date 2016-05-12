import { Component, Output, EventEmitter, OnInit, SimpleChange } from '@angular/core';
import { FORM_DIRECTIVES, FORM_BINDINGS, ControlGroup, FormBuilder, Validators } from '@angular/common';
import { MissionService } from '../../shared/mission.service';
import { BoardComponent } from '../../board/board.component';

import { IaComponent } from '../../ia/ia.component';
import { ORIENTATION } from '../../board/orientation';
import { PHASE } from '../phase';

@Component({
  selector: 'bs-one-player',
  directives: [FORM_DIRECTIVES, BoardComponent, IaComponent],
  providers: [MissionService],
  templateUrl: 'app/modes/one-player/one-player.component.html',
  styleUrls: ['app/modes/one-player/one-player.component.css']
})
export class OnePlayerComponent implements OnInit {
  boardSize: number = 10;
  form: ControlGroup;
  turns: number = 0;
  orientation: string = ORIENTATION.vertical;
  phase: string = PHASE.main;
  units: number = 5;
  //
  constructor(private missionService: MissionService, private formBuilder: FormBuilder) {
    missionService.addShipConfirmed$.subscribe(
      ship => {
        console.log(`Esta es la confirmacion desde one-player ${ship}`)
      })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      coordinateX: ['', Validators.compose([Validators.required, Validators.pattern('^[aA-zZ]{1}$')])],
      coordinateY: ['', Validators.compose([Validators.required, Validators.pattern('^\\d{1,2}$')])]
    });

    this.form.valueChanges.subscribe(data => {
      console.log(this.form)
      data.coordinateX = data.coordinateX.toUpperCase();
    });
  }

  announce(x, y, units, orientation) {
    console.log('announce()')
    let xParsed = x.charCodeAt(0) - 65,
        yParsed = parseInt(y);

    this.missionService.announceAddShip({x: xParsed, y: yParsed, units, orientation});
  }

  changeX() {
    console.log(this.form);
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
