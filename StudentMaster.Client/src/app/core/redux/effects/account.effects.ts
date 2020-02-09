import { Injectable } from '@angular/core';
import { AccountService } from '@core/services/account.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  ACCOUNT_ACTIONS,
  ChangeAvatar,
  ChangeAvatarError,
  ChangeAvatarSuccess,
  ResetPassword,
  AccountSuccess,
  AccountError,
} from '@core/redux/actions/account.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '@core/models/errorResponse.model';
import { empty } from 'rxjs/internal/Observer';



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
        catchError((error): Observable<any> => {
          return of(new ChangeAvatarError( (error as HttpErrorResponse).error));
        })
      );
    })
  );

  @Effect()
  resetPassword: Observable<Action> = this.actions$.pipe(
    ofType(ACCOUNT_ACTIONS.RESET_PASSWORD_REQUEST),
    map((action: ResetPassword ) => action.payload),
    switchMap(payload => {
      return this.aS.resetPasswordRequest(payload).pipe(
        map(() => {
          return new AccountSuccess();
        }),
        catchError((error): Observable<any> => {
          return of(new AccountError( (error as HttpErrorResponse).error));
        })
      );
    })
  );
  constructor(private aS: AccountService, private actions$: Actions) {}
}
