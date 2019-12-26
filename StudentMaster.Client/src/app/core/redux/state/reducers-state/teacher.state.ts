import { SubjectModel } from '@core/models/subject-model';
import { StudentModel } from '@core/models/student-model';

export interface TeacherState {
  subjects: SubjectModel[];
  selectedClass: number;
  students: StudentModel[];
}
