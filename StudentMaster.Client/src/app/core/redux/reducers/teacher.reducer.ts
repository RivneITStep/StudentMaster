import { TeacherState } from '../state/reducers-state/teacher.state';
import { SubjectModel } from '@core/models/subject-model';
import {
  TEACHER_ACTIONS,
  GetSubject,
  GetSubjectSuccess,
  AddHomework,
  AddHomeworkSuccess,
  GetClassStudents,
  GetClassStudentsSuccess,
} from '../actions/teacher.actions';
import { StudentModel } from '@core/models/student-model';

export const initialState: TeacherState = {
  subjects: new Array<SubjectModel>(),
  selectedClass: -1,
  students: new Array<StudentModel>(),
};

export function teacherReducer(
  state = initialState,
  action:
    | GetSubject
    | GetSubjectSuccess
    | AddHomework
    | AddHomeworkSuccess
    | GetClassStudents
    | GetClassStudentsSuccess
) {
  switch (action.type) {
    case TEACHER_ACTIONS.GET_SUBJECT_REQUEST:
      return {
        ...state,
        selectedClass: action.payload,
      };
    case TEACHER_ACTIONS.GET_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
      };
    case TEACHER_ACTIONS.GET_CLASS_STUDENTS_REQUEST:
      return {
        ...state,
        selectedClass: action.payload,
      };
    case TEACHER_ACTIONS.GET_CLASS_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    case TEACHER_ACTIONS.ADD_HOMEWORK_REQUEST:
      return {
        ...state,
      };
    case TEACHER_ACTIONS.ADD_HOMEWORK_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
  return state;
}
