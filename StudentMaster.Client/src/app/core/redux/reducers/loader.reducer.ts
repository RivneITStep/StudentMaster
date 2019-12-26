import { ShowLoader, HideLoader, LOADER_ACTIONS } from '../actions/loader.actions';
import { LoaderState } from '../state/reducers-state/loader.state';

const initialState: LoaderState = {
  isLoading: false,
};

export function loaderReducer(state = initialState, action: ShowLoader | HideLoader) {
  switch (action.type) {
    case LOADER_ACTIONS.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case LOADER_ACTIONS.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
