import { Observable, of, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AuthenticationService } from '@core/services/authentication.service';
import { AUTH_ACTIONS, Authorize, AuthorizeSuccess, AuthorizeError } from '../actions/auth.actions';
import { User } from '@core/models/user';
import { Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  @Effect()
  Authorize$: Observable<Action> = this.actions$.pipe(
    ofType(AUTH_ACTIONS.AUTHORIZE_REQUEST),
    map((action: Authorize) => action.payload),
    switchMap(payload => {
      return this.aS.login(payload.username, payload.password).pipe(
        map(user => {
          return new AuthorizeSuccess(user);
        }),
        catchError(error => {
          return of(new AuthorizeError());
        })
      );
    })
  );
  @Effect()
  LogOut$: Observable<Action> = this.actions$.pipe(
    ofType(AUTH_ACTIONS.AUTHORIZE_LOGOUT),
    switchMap(() => this.aS.logout())
  );
  constructor(private aS: AuthenticationService, private actions$: Actions) {}
}
