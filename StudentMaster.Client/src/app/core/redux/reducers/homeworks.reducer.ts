import {
  HOMEWORKS_ACTIONS,
  GetHomeworks,
  GetHomeworksSuccess,
  GetHomeworksError,
} from '../actions/homeworks.actions';

import { Homework } from '@core/models/homework';
import { HomeworksSate } from '../state/reducers-state/homeworks.state';

export const initialState: HomeworksSate = {
  homeworks: new Array<Homework>(),
};
export function homeworksReducer(
  state = initialState,
  action: GetHomeworksSuccess | GetHomeworksError | GetHomeworks
) {
  switch (action.type) {
    case HOMEWORKS_ACTIONS.GET_HOMEWORKS_REQUEST:
      return {
        ...state,
      };
    case HOMEWORKS_ACTIONS.GET_HOMEWORKS_SUCCESS:
      return {
        ...state,
        homeworks: action.payload,
      };
    case HOMEWORKS_ACTIONS.GET_HOMEWORKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
