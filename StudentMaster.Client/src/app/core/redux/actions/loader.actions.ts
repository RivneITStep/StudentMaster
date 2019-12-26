import { Action } from '@ngrx/store';

// tslint:disable-next-line: no-namespace
export namespace LOADER_ACTIONS {
  export const SHOW_LOADER = '[LOADER] SHOW_LOADER';
  export const HIDE_LOADER = '[LOADER] HIDE_LOADER';
}

export class ShowLoader implements Action {
  public readonly type = LOADER_ACTIONS.SHOW_LOADER;
}
export class HideLoader implements Action {
  public readonly type = LOADER_ACTIONS.HIDE_LOADER;
}
