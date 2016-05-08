import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { MenuComponent } from './menu/menu.component';
import { OnePlayerComponent } from './modes/one-player/one-player.component';
import { TwoPlayersComponent } from './modes/two-players/two-players.component';

@Component({
  selector: 'bs-app',
  directives: [ROUTER_DIRECTIVES, MenuComponent, OnePlayerComponent, TwoPlayersComponent],
  providers: [ROUTER_PROVIDERS],
  template: `
    <h1>battleship!!!</h1>
    <bs-menu></bs-menu>
    <h2>Aquí veremos la vista</h2>
    <router-outlet></router-outlet>
    `
})

@RouteConfig([
  {path: '/two-players', name: 'TwoPlayers', component: TwoPlayersComponent},
  {path: '/one-player', name: 'OnePlayer', component: OnePlayerComponent}
])

export class AppComponent {

}
