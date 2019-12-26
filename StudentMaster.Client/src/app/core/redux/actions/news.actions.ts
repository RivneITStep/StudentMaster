import { Action } from '@ngrx/store';
import { NewsModel } from '@core/models/news-model';

// tslint:disable-next-line: no-namespace
export namespace NEWS_ACTIONS {
  export const GET_NEWS_REQUEST = '[NEWS] GET_NEWS_REQUEST';
  export const GET_NEWS_SUCCESS = '[NEWS] GET_NEWS_SUCCESS';
  export const GET_NEWS_ERROR = '[NEWS] GET_NEWS_ERROR';
}

export class GetNews implements Action {
  public readonly type = NEWS_ACTIONS.GET_NEWS_REQUEST;
}

export class GetNewsSuccess implements Action {
  public readonly type = NEWS_ACTIONS.GET_NEWS_SUCCESS;

  constructor(public payload: NewsModel[] = []) {}
}
export class GetNewsError implements Action {
  public readonly type = NEWS_ACTIONS.GET_NEWS_ERROR;

  constructor(public payload: any = null) {}
}
