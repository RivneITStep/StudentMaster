import { Injectable } from '@angular/core';
import { AccountService } from '@core/services/account.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  ACCOUNT_ACTIONS,
  ChangeAvatar,
  ChangeAvatarError,
  ChangeAvatarSuccess,
} from '@core/redux/actions/account.actions';



@Injectable()
export class AccountEffect {
  @Effect()
  changeAvatar: Observable<Action> = this.actions$.pipe(
    ofType(ACCOUNT_ACTIONS.CHANGE_AVATAR_REQUEST),
    map((action: ChangeAvatar ) => action.payload),
    switchMap(payload => {
      return this.aS.changeAvatar(payload.base64).pipe(
        map(() => {
          return new ChangeAvatarSuccess();
        }),
        catchError(error => {
          return of(new ChangeAvatarError());
        })
      );
    })
  );

  constructor(private aS: AccountService, private actions$: Actions) {}
}
