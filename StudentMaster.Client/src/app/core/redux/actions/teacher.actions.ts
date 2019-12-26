import { Action } from '@ngrx/store';
import { AddHomeWorkModel } from '@core/models/add-homework';
import { SubjectModel } from '@core/models/subject-model';
import { StudentModel } from '@core/models/student-model';

// tslint:disable-next-line: no-namespace
export namespace TEACHER_ACTIONS {
  export const GET_SUBJECT_REQUEST = '[TEACHER] GET_SUBJECT_REQUEST';
  export const GET_SUBJECT_SUCCESS = '[TEACHER] GET_SUBJECT_SUCCESS';

  export const GET_CLASS_STUDENTS_REQUEST = '[TEACHER] GET_CLASS_STUDENTS_REQUEST';
  export const GET_CLASS_STUDENTS_SUCCESS = '[TEACHER] GET_CLASS_STUDENTS_SUCCESS';

  export const ADD_HOMEWORK_REQUEST = '[TEACHER] ADD_HOMEWORK_REQUEST';
  export const ADD_HOMEWORK_SUCCESS = '[TEACHER] ADD_HOMEWORK_SUCCESS';
}

export class GetSubject implements Action {
  public readonly type = TEACHER_ACTIONS.GET_SUBJECT_REQUEST;

  constructor(public payload: number = -1) {}
}
export class GetSubjectSuccess implements Action {
  public readonly type = TEACHER_ACTIONS.GET_SUBJECT_SUCCESS;
  constructor(public payload: SubjectModel[]) {}
}

export class GetClassStudents implements Action {
  public readonly type = TEACHER_ACTIONS.GET_CLASS_STUDENTS_REQUEST;

  constructor(public payload: number = -1) {}
}
export class GetClassStudentsSuccess implements Action {
  public readonly type = TEACHER_ACTIONS.GET_CLASS_STUDENTS_SUCCESS;
  constructor(public payload: StudentModel[]) {}
}

export class AddHomework implements Action {
  public readonly type = TEACHER_ACTIONS.ADD_HOMEWORK_REQUEST;

  constructor(public payload: AddHomeWorkModel) {}
}
export class AddHomeworkSuccess implements Action {
  public readonly type = TEACHER_ACTIONS.ADD_HOMEWORK_SUCCESS;
}
