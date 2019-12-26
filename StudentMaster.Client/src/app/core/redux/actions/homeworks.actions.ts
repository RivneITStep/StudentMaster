import { Action } from '@ngrx/store';
import { Homework } from '@core/models/homework';

// tslint:disable-next-line: no-namespace
export namespace HOMEWORKS_ACTIONS {
  export const GET_HOMEWORKS_REQUEST = '[HOMEWORKS] GET_HOMEWORKS_REQUEST';
  export const GET_HOMEWORKS_SUCCESS = '[HOMEWORKS] GET_HOMEWORKS_SUCCESS';
  export const GET_HOMEWORKS_ERROR = '[HOMEWORKS] GET_HOMEWORKS_ERROR';
}

export class GetHomeworks implements Action {
  public readonly type = HOMEWORKS_ACTIONS.GET_HOMEWORKS_REQUEST;
}

export class GetHomeworksSuccess implements Action {
  public readonly type = HOMEWORKS_ACTIONS.GET_HOMEWORKS_SUCCESS;

  constructor(public payload: Homework[] = []) {}
}
export class GetHomeworksError implements Action {
  public readonly type = HOMEWORKS_ACTIONS.GET_HOMEWORKS_ERROR;

  constructor(public payload: any = null) {}
}
