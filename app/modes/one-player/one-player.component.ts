import { Component, Output, EventEmitter, OnInit, SimpleChange } from '@angular/core';
import { FORM_DIRECTIVES, FORM_BINDINGS, ControlGroup, FormBuilder, Validators, Control } from '@angular/common';

import { MissionService } from '../../shared/mission.service';
import { BoardComponent } from '../../board/board.component';
import { ORIENTATION } from '../../board/orientation';
import { PHASE } from '../phase';

@Component({
  selector: 'bs-one-player',
  directives: [FORM_DIRECTIVES, BoardComponent],
  providers: [MissionService],
  templateUrl: 'app/modes/one-player/one-player.component.html',
  styleUrls: ['app/shared/base.css', 'app/modes/one-player/one-player.component.css']
})
export class OnePlayerComponent implements OnInit {
  cellsStack: Array<Object> = [];
  boardSize: number = 10;
  upperCaseMax: string;
  coordinatesForm: ControlGroup;
  turns: number = 1;
  orientation: string = ORIENTATION.horizontal;
  phase: string = PHASE.main;
  shipsUnitsToPlace: Array<number> = [5, 4, 3, 2];
  message: string;

  constructor(private missionService: MissionService, private formBuilder: FormBuilder) {
    missionService.addShipConfirmed$.subscribe(
      data => {
        console.log(`Esta es la confirmacion desde one-player ${data.isSuccess}`);
        this.analizeAddShipConfirmed(data);
      }
    )
    missionService.playerTurnFinished$.subscribe(
      isFinished => {
        console.log(`Turno de jugador finalizado ${isFinished}`);
        if(isFinished) {
          console.log(`Turno de IA`);

          setTimeout(()=> {
            this.iaShoots();
          }, 1500);
        }

      }
    )
  }

  analizeAddShipConfirmed (data) {
    let {isSuccess, msg} = data;

    if (isSuccess && this.shipsUnitsToPlace.length) {
      this.shipsUnitsToPlace.shift();

      (<Control>this.coordinatesForm.controls['coordinateX']).updateValue('');
      (<Control>this.coordinatesForm.controls['coordinateY']).updateValue('');
    }

    if (!this.shipsUnitsToPlace.length) {
      this.phase = PHASE.battle;
    }

    this.message = data.msg;
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
      data.coordinateX = data.coordinateX.toUpperCase();
    });

    this.generateCellsStack(this.boardSize);
  }

  announce(x, y, units, orientation) {
    let xParsed = x.charCodeAt(0) - 65,
        yParsed = parseInt(y);

    this.missionService.announceAddShip({x: xParsed, y: yParsed, units, orientation});
  }

  addTurn() {
    this.turns++;
  }

  isIaTurn(turns) {
    return !!(turns % 2);
  }

  iaShoots() {
    console.log('iaShoots');
    this.addTurn();
    this.missionService.announceShoot(this.cellsStack.shift());
  }

  changeOrientation() {
    if (this.orientation === ORIENTATION.vertical) {
      this.orientation = ORIENTATION.horizontal;
    } else {
      this.orientation = ORIENTATION.vertical;
    }
  }

  generateCellsStack(size) {
    for(let i = 0; i< size; i++) {
      for(let j = 0; j< size; j++) {
        this.cellsStack.push({x: i, y: j});
      }
    }

    shuffle(this.cellsStack);
  }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
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
