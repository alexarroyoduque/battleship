import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MissionService {
  //https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
  // Observable string sources
  private addShipAnnouncedSource = new Subject<any>();
  private addShipConfirmedSource = new Subject<any>();
  // Observable string streams
  addShipAnnounced$ = this.addShipAnnouncedSource.asObservable();
  addShipConfirmed$ = this.addShipConfirmedSource.asObservable();
  // Service message commands
  announceAddShip(newShip) {
    this.addShipAnnouncedSource.next(newShip)
  }
  confirmAddShip(result) {
    this.addShipConfirmedSource.next(result);
  }


  // Observable string sources
  private shootAnnouncedSource = new Subject<any>();
  // Observable string streams
  shootAnnounced$ = this.shootAnnouncedSource.asObservable();
  // Service message commands
  announceShoot(coordinates) {
    this.shootAnnouncedSource.next(coordinates)
  }


}
