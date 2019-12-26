import { Component, OnInit } from '@angular/core';
import { ScheduleModel } from '@core/models/schedule-model';
import { ScheduleService } from '@core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'start', 'end'];
  dataSource: any[] = [];
  Schedule: ScheduleModel[] = [];
  constructor(private SchedService: ScheduleService) {
    this.SchedService.GetSchedule();
    this.SchedService.Schedule.subscribe(x => {
      this.Schedule = x;
    });
  }
  ngOnInit() {
    // this.dataSource = this.Schedule.;
  }
  onChange(event: any) {
    this.dataSource = this.Schedule[event].items;
  }
}
