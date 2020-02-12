import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core';
import { MatDialog } from '@angular/material/dialog';
import { CropperComponent } from '@shared/components/cropper/cropper.component';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { IMG_API } from './../../../core/config';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
})
export class ProfileLayoutComponent implements OnInit {
  img = '';
  name = '';
  email = '';
  constructor(
    public store: Store<IAppState>,
    public dialog: MatDialog,
    public aS: AuthenticationService
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe(data => {
      if (data.isAuthorize) {
        this.email = this.aS.getEmail();
        this.img = IMG_API + data.user.ava;
        this.name = this.aS.getLogin();
      }
    });
  }
  changePhoto() {
    const selector = document.getElementById('photoSelector') as HTMLInputElement;
    selector.click();
    selector.onchange = event => {
      const dialogRef = this.dialog.open(CropperComponent, {
        width: '60%',
        data: event,
      });

      dialogRef.afterClosed();
    };
  }
}
