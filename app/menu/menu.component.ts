import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

@Component({
  selector: 'bs-menu',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/menu/menu.component.html',
  styleUrls: ['app/shared/base.css', 'app/menu/menu.component.css']
})

export class MenuComponent {
}
