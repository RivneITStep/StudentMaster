import { Component } from '@angular/core';
import { AuthenticationService, IMG_API } from '@core';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user',
  template: `
    <a mat-button href="javascript:void(0)" [matMenuTriggerFor]="menu">
      <img class="matero-user-avatar r-full align-middle" [src]="img" width="24" alt="avatar" />
      <span class="align-middle">{{ name }}</span>
    </a>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Profile</span>
      </a>
      <a routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
      <a routerLink="/auth/login" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent {
  img = '';
  name = '';
  constructor(public aS: AuthenticationService, private store: Store<IAppState>) {
    this.store.select('auth').subscribe(data => {
      if (data.isAuthorize) {
        this.img = IMG_API + data.user.ava;
        this.name = this.aS.getLogin();
      }
    });
  }
}
