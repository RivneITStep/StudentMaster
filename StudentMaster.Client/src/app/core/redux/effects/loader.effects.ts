import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { HOMEWORKS_ACTIONS } from '../actions/homeworks.actions';
import { ShowLoader, HideLoader } from '../actions/loader.actions';
import { NEWS_ACTIONS } from '../actions/news.actions';
import { MARKS_ACTIONS } from '../actions/marks.actions';
import { TEACHER_ACTIONS } from '../actions/teacher.actions';

// type showSpinnerTypes = GetHomeworks | GetNews | GetMarks;

const showSpinnerActions = [
  HOMEWORKS_ACTIONS.GET_HOMEWORKS_REQUEST,
  NEWS_ACTIONS.GET_NEWS_REQUEST,
  MARKS_ACTIONS.GET_MARKS_REQUEST,
  TEACHER_ACTIONS.ADD_HOMEWORK_REQUEST,
  TEACHER_ACTIONS.GET_SUBJECT_REQUEST,
];

// type hideSpinnerTypes =
//   | GetHomeworksSuccess
//   | GetHomeworksError
//   | GetNewsError
//   | GetNewsSuccess
//   | GetMarksSuccess
//   | GetMarksError
//   | GetSubjectError
//   | GetSubjectSuccess
//   | AddHomeworkSuccess
//   | AddHomeworkError;

const hideSpinnerActions = [
  HOMEWORKS_ACTIONS.GET_HOMEWORKS_SUCCESS,
  HOMEWORKS_ACTIONS.GET_HOMEWORKS_ERROR,
  NEWS_ACTIONS.GET_NEWS_ERROR,
  NEWS_ACTIONS.GET_NEWS_SUCCESS,
  MARKS_ACTIONS.GET_MARKS_ERROR,
  MARKS_ACTIONS.GET_MARKS_SUCCESS,
  TEACHER_ACTIONS.ADD_HOMEWORK_SUCCESS,
  TEACHER_ACTIONS.GET_SUBJECT_SUCCESS,
];

@Injectable()
export class LoaderEffects {
  @Effect()
  showSpinner: Observable<Action> = this.actions$.pipe(
    ofType(...showSpinnerActions),
    switchMap(() => of(new ShowLoader()))
  );
  @Effect()
  hideSpinner: Observable<Action> = this.actions$.pipe(
    ofType(...hideSpinnerActions),
    switchMap(() => of(new HideLoader()))
  );
  constructor(private actions$: Actions) {}
}
