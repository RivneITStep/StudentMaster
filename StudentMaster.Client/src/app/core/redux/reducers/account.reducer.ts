
import { AccountState } from '@core/redux/state/reducers-state/account.state';
import {
  ACCOUNT_ACTIONS,
  ChangeAvatar,
  ChangeAvatarError,
  ChangeAvatarSuccess,
  ResetPassword,
  AccountError,
  AccountSuccess,
} from '@core/redux/actions/account.actions';

const initialState: AccountState = {
  error: null,
  failed: false,
  success: false,
  isLoading: false
};

export function accountReducer(state = initialState, action: ChangeAvatar | ChangeAvatarSuccess | ChangeAvatarError | ResetPassword | AccountSuccess | AccountError) {
  switch (action.type) {
    case ACCOUNT_ACTIONS.CHANGE_AVATAR_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        failed: false,
        error: null,
      };
    case ACCOUNT_ACTIONS.CHANGE_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case ACCOUNT_ACTIONS.CHANGE_AVATAR_ERROR:
      return {
        ...state,
        isLoading: false,
        failed: true,
        error: action.payload,
      };
      case ACCOUNT_ACTIONS.RESET_PASSWORD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: false,
          failed: false,
          error: null,
        };
      case ACCOUNT_ACTIONS.ACCOUNT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: true,
        };
      case ACCOUNT_ACTIONS.ACCOUNT_ERROR:
        return {
          ...state,
          isLoading: false,
          failed: true,
          error: action.payload,
        };
    default:
      return state;
  }
}
