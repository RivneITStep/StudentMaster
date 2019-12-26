import { Action } from '@ngrx/store';
// tslint:disable-next-line: no-namespace
export namespace MARKS_ACTIONS {
  export const GET_MARKS_REQUEST = '[MARKS] GET_MARKS_REQUEST';
  export const GET_MARKS_SUCCESS = '[MARKS] GET_MARKS_SUCCESS';
  export const GET_MARKS_ERROR = '[MARKS] GET_MARKS_ERROR';
}

export class GetMarks implements Action {
  public readonly type = MARKS_ACTIONS.GET_MARKS_REQUEST;
}

export class GetMarksSuccess implements Action {
  public readonly type = MARKS_ACTIONS.GET_MARKS_SUCCESS;

  constructor(public payload: any) {}
}
export class GetMarksError implements Action {
  public readonly type = MARKS_ACTIONS.GET_MARKS_ERROR;

  constructor(public payload: any = null) {}
}
