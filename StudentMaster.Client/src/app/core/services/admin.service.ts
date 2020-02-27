import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassModel } from '@core/models/classes-model';
import { API } from '@core/config';
import { SubjectModel } from '@core/models/subject-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getAllClasses() {
    return this.http.get<ClassModel[]>(API + '/api/Admin/get-all-classes');
  }
  public inviteUser(email, classId) {
    return this.http.get(API + '/api/Admin/invite-user/' + email + '/' + classId);
  }
  public removeStudentFromClass(studentId) {
    return this.http.get(API + '/api/Admin/remove-student-from-class/' + studentId);
  }
  public getClassSubjects(classId) {
    return this.http.get<SubjectModel[]>(API + '/api/Admin/get-class-subjects/' + classId);
  }
  public getAllSubjects() {
    return this.http.get<SubjectModel[]>(API + '/api/Admin/get-all-subjects');
  }
  public editSubjectsInClass(classId, subjectId) {
    return this.http.get<SubjectModel[]>(API + `/api/Admin/edit-subjects-in-class/${classId}/${subjectId}`);
  }
}
