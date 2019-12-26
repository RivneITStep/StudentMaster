import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleItem, ScheduleModel } from '../models/schedule-model';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  Schedule: BehaviorSubject<ScheduleModel[]>;
  constructor(
    private http: HttpClient,
    private Spinner: NgxSpinnerService,
    private Auth: AuthenticationService
  ) {
    this.Schedule = new BehaviorSubject(null);
  }
  GetSchedule() {
    this.Spinner.show();
    this.http.get<ScheduleModel[]>(API + '/api/Schedule/GetSchedules').subscribe(
      x => {
        this.Schedule.next(x);
        this.Spinner.hide();
      },
      x => {
        // if (x.status === 401) {
        //   setTimeout(() => {
        //     this.GetSchedule();
        //   }, 1000);
        // }
        this.Spinner.hide();
        // console.error('====================');
        // console.log(x);
        // console.error('====================');
      }
    );
  }
}
