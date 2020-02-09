import { SubjectModel } from '@core/models/subject-model';
import { StudentModel } from '@core/models/student-model';
import { ErrorResponse } from '@core/models/errorResponse.model';

export interface StudentClassState {
  classmates: StudentModel[];
  isLoading: boolean;
  failed: boolean;
  success: boolean;
  error: ErrorResponse;
}
