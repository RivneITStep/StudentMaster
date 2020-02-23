import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@core/config';
import { StudentModel } from '@core/models/student-model';
import { SubjectModel } from '@core/models/subject-model';
import { ClassModel } from '@core/models/classes-model';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private http: HttpClient) {}
  public getStudentsByClassId(id): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(API + '/api/Class/get-students-by-class-id/' + id);
  }
  public getTeacherClassSubjects(id): Observable<SubjectModel[]> {
    return this.http.get<SubjectModel[]>(API + '/api/Class/get-subject-for-teacher-by-class-id/' + id);
  }
  public getStudentMarkByDateAndSubject(subjectId, uid, date): Observable<number> {
    return this.http.post<number>(API + '/api/Marks/get-student-mark-by-subject-and-date', {
      subjectId,
      uid,
      date,
    });
  }
  public addMarkForStudentAsync(uid, type, subjectId, mark, date) {
    return this.http.post<number>(API + '/api/Marks/add-mark-for-student', {
      subjectId,
      uid,
      date,
      type,
      mark,
    });
  }
 public getClassmates() {
   return this.http.get<StudentModel[]>(API + '/api/Class/get-classmates');
 }
 public getClasses() {
   return this.http.get<ClassModel[]>(API + '/api/Account/get-my-classes');
 }
}
