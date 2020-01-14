import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ClassesService } from '@core/services/classes.service';
import { SubjectModel } from '@core/models/subject-model';
import {
  TEACHER_ACTIONS,
  GetSubject,
  GetSubjectSuccess,
  GetClassStudents,
  GetClassStudentsSuccess,
} from '../actions/teacher.actions';
import { HideLoader } from '../actions/loader.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TeacherEffects {


  @Effect()
  getSubjects$: Observable<Action> = this.actions$.pipe(
    ofType(TEACHER_ACTIONS.GET_SUBJECT_REQUEST),
    map((action: GetSubject ) => action.payload),
    switchMap(payload => {
      return this.cS.getTeacherClassSubjects(payload).pipe(
        map((subjects: SubjectModel[]) => {
          return new GetSubjectSuccess(subjects);
        })
      );
    })
  );
 /*
  @Effect()
  getSubjects$: Observable<Action> = this.actions$.pipe(
    ofType(TEACHER_ACTIONS.GET_SUBJECT_REQUEST),
    switchMap((payload: GetSubject) => {
      return this.cS.getTeacherClassSubjects(payload.payload).pipe(
        map(subjects => {
          console.log(subjects);
          return new GetSubjectSuccess(subjects);
        }),
        catchError(err => of(new HideLoader()))
      );
    })
  );
*/
  @Effect()
  getClassStudents$: Observable<Action> = this.actions$.pipe(
    ofType(TEACHER_ACTIONS.GET_CLASS_STUDENTS_REQUEST),
    switchMap((payload: GetClassStudents) => {
      return this.cS.getStudentsByClassId(payload.payload).pipe(
        map(students => {
          return new GetClassStudentsSuccess(students);
        }),
        catchError(err => of(new HideLoader()))
      );
    })
  );
  constructor(private cS: ClassesService, private actions$: Actions) {}
}
