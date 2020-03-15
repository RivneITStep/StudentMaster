import { Injectable } from '@angular/core';
import { AddHomeWorkModel } from '@core/models/add-homework';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '@core/config';
import { Homework } from '@core/models/homework';
import { TeacherHomework } from '@core/models/teacherhomework.model';

@Injectable({
  providedIn: 'root',
})
export class HomeworksService {
  constructor(private http: HttpClient) {}

  headersForForm = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    }),
  };

  AddHomeWorkAsync(data: FormData) {
    return this.http.post(API + '/api/HomeWork/add-homework', data);
  }
  doHomeWorkAsync(data: FormData) {
    return this.http.post(API + '/api/HomeWork/do-homework', data);
  }
  removeMyHomework(id) {
    return this.http.get(API + '/api/HomeWork/remove-my-homework/' + id);
  }
  getMyHomeworksRedux() {
    return this.http.get<Homework[]>(API + '/api/HomeWork/get-my-homeworks');
  }
  getTeacherHomeworks() {
    return this.http.get<TeacherHomework[]>(API + '/api/HomeWork/get-teacher-homeworks');
  }
  reviewHomeWork(wid, mark) {
    return this.http.get(API + '/api/HomeWork/review-homework/' + wid + '/' + mark);
  }
}
