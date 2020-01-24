import { Action } from '@ngrx/store';
import { NewsModel } from '@core/models/news-model';
import { StudentModel } from '@core/models/student-model';

// tslint:disable-next-line: no-namespace
export namespace STUDENTCLASS_ACTIONS {
  export const GET_CLASSMATES = '[STUDENT-CLASS] GET_CLASSMATES';
  export const GET_CLASSMATES_SUCCESS = '[STUDENT-CLASS] GET_CLASSMATES_SUCCESS';
  export const GET_CLASSMATES_ERROR = '[STUDENT-CLASS] GET_CLASSMATES_ERROR';
}

export class GetClassmates implements Action {
  public readonly type = STUDENTCLASS_ACTIONS.GET_CLASSMATES;
}

export class GetClassmatesSuccess implements Action {
  public readonly type = STUDENTCLASS_ACTIONS.GET_CLASSMATES_SUCCESS;

  constructor(public payload: StudentModel[] = []) {}
}
export class GetClassmatesError implements Action {
  public readonly type = STUDENTCLASS_ACTIONS.GET_CLASSMATES_ERROR;

  constructor(public payload: any = null) {}
}
