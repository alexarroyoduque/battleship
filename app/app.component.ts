import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { MenuComponent } from './menu/menu.component';
import { OnePlayerComponent } from './modes/one-player/one-player.component';

@Component({
  selector: 'bs-app',
  directives: [ROUTER_DIRECTIVES, MenuComponent, OnePlayerComponent],
  providers: [ROUTER_PROVIDERS],
  template: `
    <div class="general">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['app/app.component.css']
})

@RouteConfig([
  {path: '/menu', name: 'Menu', component: MenuComponent, useAsDefault: true},
  {path: '/one-player', name: 'OnePlayer', component: OnePlayerComponent},
])

export class AppComponent {
}
