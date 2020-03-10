import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './../config';

import { marksForChartResult } from '@core/models/markForChart';
import { AvarageMarks } from '@core/models/average-marks';
import { ShowMarkModel } from '@core/models/showMarksModel';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  constructor(private http: HttpClient) {}

  getMyMarksByDate(date: any) {
    return this.http.get<ShowMarkModel[]>(API + '/api/Marks/get-my-marks-by-date/' + date);
  }
  getMyMarkForChart() {
    return this.http.get<marksForChartResult>(API + '/api/Marks/get-marks-for-chart');
  }
  getAverageMarks() {
    return this.http.get<AvarageMarks[]>(API + '/api/Marks/get-avarage-marks');
  }
}
