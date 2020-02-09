import { IAppState } from '@core/redux/state/app.state';
import { createSelector } from '@ngrx/store';
import { StudentClassState } from '../state/reducers-state/student-class.state';

export const selectStudentClass = (state: IAppState) => state.account;


export const selectStudentClassError = createSelector(selectStudentClass, (state: StudentClassState) => state.error);
export const selectStudentClassIsLoading = createSelector(selectStudentClass, (state: StudentClassState) => state.isLoading);
export const selectStudentClassIsSuccess = createSelector(selectStudentClass, (state: StudentClassState) => state.success);
export const selectStudentClassIsFailed = createSelector(selectStudentClass, (state: StudentClassState) => state.failed);
export const selectStudentClassClassmates = createSelector(selectStudentClass, (state: StudentClassState) => state.classmates);
