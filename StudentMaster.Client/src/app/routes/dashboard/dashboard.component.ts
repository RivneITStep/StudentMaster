import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { GetMarks } from '@core/redux/actions/marks.actions';
import { GetClassmates } from '@core/redux/actions/student-class.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private store: Store<IAppState>) {}
  ngOnInit() {
    this.store.dispatch(new GetMarks());
    this.store.dispatch(new GetClassmates());
  }
}
