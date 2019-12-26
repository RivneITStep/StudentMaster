import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HomeworksService } from '@core/services/homeworks.service';
import {
  GetHomeworksSuccess,
  HOMEWORKS_ACTIONS,
  GetHomeworksError,
} from '../actions/homeworks.actions';
import { Homework } from './../../models/homework';
import { ClassesService } from '@core/services/classes.service';

@Injectable()
export class HomeworksEffects {
  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(HOMEWORKS_ACTIONS.GET_HOMEWORKS_REQUEST),
    switchMap(() => this.hS.getMyHomeworksRedux()),
    switchMap((homeworks: Homework[]) => of(new GetHomeworksSuccess(homeworks))),
    catchError(err => of(new GetHomeworksError(err)))
  );

  constructor(private hS: HomeworksService, private actions$: Actions) {}
}
