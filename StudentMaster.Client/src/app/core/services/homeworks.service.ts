import { Injectable } from '@angular/core';
import { AddHomeWorkModel } from '@core/models/add-homework';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '@core/config';
import { Homework } from '@core/models/homework';

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
  getMyHomeworksRedux() {
    return this.http.get<Homework[]>(API + '/api/HomeWork/get-my-homeworks');
  }
}
