import { AuthState } from '../state/reducers-state/auth.state';
import {
  Authorize,
  AuthorizeSuccess,
  AUTH_ACTIONS,
  Logout,
  AuthorizeError,
} from '../actions/auth.actions';
import { LOADER_ACTIONS } from '../actions/loader.actions';

const initialState: AuthState = {
  isLoading: false,
  isAuthorize: false,
  user: null,
};

export function authReducer(
  state = initialState,
  action: Authorize | AuthorizeSuccess | Logout | AuthorizeError
) {
  switch (action.type) {
    case AUTH_ACTIONS.AUTHORIZE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_ACTIONS.AUTHORIZE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthorize: true,
        user: action.payload,
      };
    case AUTH_ACTIONS.AUTHORIZE_LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthorize: false,
        user: null,
      };
    case AUTH_ACTIONS.AUTHORIZE_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
