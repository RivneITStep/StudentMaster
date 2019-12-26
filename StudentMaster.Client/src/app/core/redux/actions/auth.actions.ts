import { Action } from '@ngrx/store';
import { User } from '@core/models/user';

// tslint:disable-next-line: no-namespace
export namespace AUTH_ACTIONS {
  export const AUTHORIZE_REQUEST = '[AUTH] AUTHORIZE_REQUEST';
  export const AUTHORIZE_SUCCESS = '[AUTH] AUTHORIZE_SUCCESS';
  export const AUTHORIZE_ERROR = '[AUTH] AUTHORIZE_ERROR';

  export const AUTHORIZE_LOGOUT = '[AUTH] AUTHORIZE_LOGOUT';
}

export class Authorize implements Action {
  public readonly type = AUTH_ACTIONS.AUTHORIZE_REQUEST;

  constructor(public payload: any) {}
}
export class AuthorizeSuccess implements Action {
  public readonly type = AUTH_ACTIONS.AUTHORIZE_SUCCESS;

  constructor(public payload: User) {}
}

export class AuthorizeError implements Action {
  public readonly type = AUTH_ACTIONS.AUTHORIZE_ERROR;
}

export class Logout implements Action {
  public readonly type = AUTH_ACTIONS.AUTHORIZE_LOGOUT;
}
