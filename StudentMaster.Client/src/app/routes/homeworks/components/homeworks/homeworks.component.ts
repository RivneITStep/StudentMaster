import { Component, OnInit } from '@angular/core';
import { Homework } from '@core/models/homework';
import { HomeworksService } from '@core/services/homeworks.service';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { GetHomeworks } from '@core/redux/actions/homeworks.actions';
import { IMG_API } from '@core/config';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.css'],
})
export class HomeworksComponent implements OnInit {
  homeworks: Homework[] = [];

  fileAPI = IMG_API;
  constructor(private hS: HomeworksService, private store: Store<IAppState>) {}
  ngOnInit() {
    this.store.dispatch(new GetHomeworks());
    // this.hS.getMyHomeworks().subscribe(x => {
    //   this.homeworks = x;
    // });
    this.store.select('homeworks').subscribe(data => {
      this.homeworks = data.homeworks;
    });
  }
}
