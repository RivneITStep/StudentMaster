import { Action } from '@ngrx/store';
import { ErrorResponse } from '@core/models/errorResponse.model';


// tslint:disable-next-line: no-namespace
export namespace ACCOUNT_ACTIONS {
  export const CHANGE_AVATAR_REQUEST = '[ACCOUNT] CHANGE_AVATAR_REQUEST';
  export const CHANGE_AVATAR_SUCCESS = '[ACCOUNT] CHANGE_AVATAR_SUCCESS';
  export const CHANGE_AVATAR_ERROR = '[ACCOUNT] CHANGE_AVATAR_ERROR';

  export const RESET_PASSWORD_REQUEST = '[ACCOUNT] RESET_PASSWORD_REQUEST';
  export const ACCOUNT_SUCCESS = '[ACCOUNT] ACCOUNT_SUCCESS';
  export const ACCOUNT_ERROR = '[ACCOUNT] ACCOUNT_ERROR';
}

export class ChangeAvatar implements Action {
  public readonly type = ACCOUNT_ACTIONS.CHANGE_AVATAR_REQUEST;
  constructor(public payload: any) {}
}

export class ChangeAvatarSuccess implements Action {
  public readonly type = ACCOUNT_ACTIONS.CHANGE_AVATAR_SUCCESS;
}
export class ChangeAvatarError implements Action {
  public readonly type = ACCOUNT_ACTIONS.CHANGE_AVATAR_ERROR;

  constructor(public payload: ErrorResponse) {}
}

export class ResetPassword implements Action {
  public readonly type = ACCOUNT_ACTIONS.RESET_PASSWORD_REQUEST;
  constructor(public payload: any) {}
}

export class AccountSuccess implements Action {
  public readonly type = ACCOUNT_ACTIONS.ACCOUNT_SUCCESS;
}
export class AccountError implements Action {
  public readonly type = ACCOUNT_ACTIONS.ACCOUNT_ERROR;

  constructor(public payload: ErrorResponse) {}
}
