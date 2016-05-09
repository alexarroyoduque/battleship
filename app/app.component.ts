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
    <h2>Aquí veremos la vista</h2>
    <router-outlet></router-outlet>
  `
})

@RouteConfig([
  {path: '/menu', name: 'Menu', component: MenuComponent, useAsDefault: true},
  {path: '/one-player', name: 'OnePlayer', component: OnePlayerComponent},
  {path: '/two-players', name: 'TwoPlayers', component: TwoPlayersComponent}
])

export class AppComponent {

}
