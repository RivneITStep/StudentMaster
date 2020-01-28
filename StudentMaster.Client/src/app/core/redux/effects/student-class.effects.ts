import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { STUDENTCLASS_ACTIONS, GetClassmates, GetClassmatesError, GetClassmatesSuccess } from '../actions/student-class.actions';
import { ClassesService } from '@core/services/classes.service';
import { StudentModel } from '@core/models/student-model';



@Injectable()
export class StudentClassEffects {
  @Effect()
  getClassmates: Observable<Action> = this.actions$.pipe(
    ofType(STUDENTCLASS_ACTIONS.GET_CLASSMATES),
    switchMap(_ => {
      return this.cS.getClassmates().pipe(
        map((students: StudentModel[]) =>  new GetClassmatesSuccess(students)),
        catchError((error): Observable<any> => {
          return of(new GetClassmatesError( (error as HttpErrorResponse).error));
        })
      );
    })
  );

  constructor(private cS: ClassesService, private actions$: Actions) {}
}
