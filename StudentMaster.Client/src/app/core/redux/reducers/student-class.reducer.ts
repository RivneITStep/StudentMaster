
import { StudentClassState } from '../state/reducers-state/student-class.state';
import { StudentModel } from '@core/models/student-model';
import { GetClassmatesSuccess, GetClassmatesError, STUDENTCLASS_ACTIONS, GetClassmates } from '../actions/student-class.actions';

const initialState: StudentClassState = {
  error: null,
  failed: false,
  success: false,
  isLoading: false,
  classmates: new Array<StudentModel>()
};

export function studentclassReducer(state = initialState, action: GetClassmates | GetClassmatesSuccess | GetClassmatesError) {
  switch (action.type) {
    case STUDENTCLASS_ACTIONS.GET_CLASSMATES:
      return {
        ...state,
        isLoading: true,
        success: false,
        failed: false,
        error: null,
      };
    case STUDENTCLASS_ACTIONS.GET_CLASSMATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        classmates: action.payload,
      };
    case STUDENTCLASS_ACTIONS.GET_CLASSMATES_ERROR:
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
