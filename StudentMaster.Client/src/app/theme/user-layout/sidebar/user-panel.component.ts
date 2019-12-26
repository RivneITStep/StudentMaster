import { Component } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { IMG_API } from '@core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div
      class="matero-user-panel p-y-16 b-t-1 b-b-1"
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <img class="matero-user-panel-avatar m-b-8 r-full" [src]="img" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name m-t-0 m-b-8 f-w-400">
        {{ name }}
      </h4>
      <h5 class="matero-user-panel-email m-t-0 m-b-8 f-w-400">
        {{ email }}
      </h5>
      <div class="matero-user-panel-icons text-nowrap">
        <a routerLink="/profile/overview" mat-icon-button>
          <mat-icon class="icon-18">account_circle</mat-icon>
        </a>
        <a routerLink="/profile/settings" mat-icon-button>
          <mat-icon class="icon-18">settings</mat-icon>
        </a>
        <a routerLink="/auth/login" mat-icon-button>
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent {
  name = '';
  email = '';
  img = '';
  constructor(private store: Store<IAppState>, private  aS: AuthenticationService) {
    this.store.select('auth').subscribe(data => {
      if (data.isAuthorize) {
        this.email = this.aS.getEmail();
        this.img = IMG_API + data.user.ava;
        this.name = this.aS.getLogin();
      }
    });
  }
}
