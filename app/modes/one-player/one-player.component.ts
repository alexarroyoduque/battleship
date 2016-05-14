import { Component, Output, EventEmitter, OnInit, SimpleChange } from '@angular/core';
import { FORM_DIRECTIVES, FORM_BINDINGS, ControlGroup, FormBuilder, Validators, Control } from '@angular/common';

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
  upperCaseMax: string;
  coordinatesForm: ControlGroup;
  turns: number = 0;
  orientation: string = ORIENTATION.vertical;
  phase: string = PHASE.main;
  shipToPlace: Array<number> = [5, 4, 3, 2];
  //
  constructor(private missionService: MissionService, private formBuilder: FormBuilder) {
    missionService.addShipConfirmed$.subscribe(
      ship => {
        console.log(`Esta es la confirmacion desde one-player ${ship}`)
      })
  }


  generateXCoordinatesPattern (range: number) {
    let initPattern = '^[aA-',
        endPattern = ']{1}$',
        xCoordinatesPattern,
        lowCaseMax,
        upperCaseMax;

    lowCaseMax = String.fromCharCode('a'.charCodeAt(0) + range - 1);
    upperCaseMax = String.fromCharCode('A'.charCodeAt(0) + range - 1);

    this.upperCaseMax = upperCaseMax;

    xCoordinatesPattern = `${initPattern}${lowCaseMax}${upperCaseMax}${endPattern}`

    return xCoordinatesPattern;
  }

  ngOnInit() {
    let xCoordinatesPattern = this.generateXCoordinatesPattern(this.boardSize);

    this.coordinatesForm = this.formBuilder.group({
      coordinateX: ['', Validators.compose([Validators.required, Validators.pattern(xCoordinatesPattern)])],
      coordinateY: ['', Validators.compose([Validators.required, Validators.pattern('^\\d{1,2}$'), validateMaxInteger])]
    });

    this.coordinatesForm.valueChanges.subscribe(data => {
      console.log(this.coordinatesForm)
      data.coordinateX = data.coordinateX.toUpperCase();
    });
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

function validateMaxInteger(c: Control) {

  function checkRange(anyInteger, max) {
    let isValid: boolean = false;

    if (anyInteger <= max) {
        isValid = true;
    }

    return isValid;
  }

  return checkRange(c.value, 10) ? null : {
    validateMaxInteger: {
      valid: false
    }
  };
}
