import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './../config';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  constructor(private http: HttpClient) {}

  getMyMarksByDate(date: any) {
    return this.http.get(API + '/api/Marks/getByDate?date=' + date);
  }
  getMyMarkForChart() {
    return this.http.get(API + '/api/Marks/get-marks-for-chart');
  }
}
