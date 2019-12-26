import { Component, Input, OnInit } from '@angular/core';
import { MenuService, Menu, AuthenticationService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent implements OnInit {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = true;

  allRoutes = this.menuService.getAll();
  menus: Menu[] = [];
  constructor(private menuService: MenuService, private authService: AuthenticationService) {}
  ngOnInit(): void {
    this.allRoutes.map(rout => {
      if (rout.role) {
        if (this.authService.HasRole(rout.role)) {
          this.menus.push(rout);
        }
      } else {
        this.menus.push(rout);
      }
    });
  }
  // Delete empty value in array
  filterStates(states: string[]) {
    return states.filter(item => item && item.trim());
  }
}
