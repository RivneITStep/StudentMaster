import { Action } from '@ngrx/store';


// tslint:disable-next-line: no-namespace
export namespace ACCOUNT_ACTIONS {
  export const CHANGE_AVATAR_REQUEST = '[ACCOUNT] CHANGE_AVATAR_REQUEST';
  export const CHANGE_AVATAR_SUCCESS = '[ACCOUNT] CHANGE_AVATAR_SUCCESS';
  export const CHANGE_AVATAR_ERROR = '[ACCOUNT] CHANGE_AVATAR_ERROR';
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
}
