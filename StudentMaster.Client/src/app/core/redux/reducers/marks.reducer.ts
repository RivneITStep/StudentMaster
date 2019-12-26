import { GetMarks, GetMarksSuccess, GetMarksError, MARKS_ACTIONS } from '../actions/marks.actions';
import { MarksState } from '../state/reducers-state/marks.state';

export const initialState: MarksState = {
  marksForChart: null,
};

export function marksReducer(
  state = initialState,
  action: GetMarks | GetMarksSuccess | GetMarksError
) {
  switch (action.type) {
    case MARKS_ACTIONS.GET_MARKS_REQUEST:
      return {
        ...state,
      };
    case MARKS_ACTIONS.GET_MARKS_SUCCESS:
      return {
        ...state,
        marksForChart: action.payload,
      };
    case MARKS_ACTIONS.GET_MARKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
