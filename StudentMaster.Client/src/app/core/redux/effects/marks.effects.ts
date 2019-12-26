import { Injectable } from '@angular/core';

import { Effect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, catchError, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { MARKS_ACTIONS, GetMarksSuccess, GetMarksError } from '../actions/marks.actions';
import { MarksService } from '@core/services/marks.service';

@Injectable()
export class MarksEffects {
  @Effect()
  getMarksForChart$: Observable<Action> = this.actions$.pipe(
    ofType(MARKS_ACTIONS.GET_MARKS_REQUEST),
    switchMap(() => {
      return this.mS.getMyMarkForChart().pipe(
        map(user => {
          return new GetMarksSuccess(user);
        }),
        catchError(error => {
          return of(new GetMarksError(error));
        })
      );
    })
  );

  constructor(private mS: MarksService, private actions$: Actions) {}
}
