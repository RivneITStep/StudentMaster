import { Component, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { GetMarks } from '@core/redux/actions/marks.actions';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.component.html',
  styleUrls: ['./marks-list.component.scss'],
})
export class MarksListComponent implements OnInit {
  constructor(private readonly store: Store<IAppState>) {}
  marks: any[] = [];
  subjectsFilter: string[] = [];
  ngOnInit() {
    this.subjectsFilter.push('ALL');
    this.store.select('marks').subscribe(x => {
      x.marksForChart.forEach(element => {
        this.addToMasive(element);
        if (this.subjectsFilter.indexOf(element.indicator) === -1) {
          this.subjectsFilter.push(element.indicator);
        }
      });
    });
  }
  addToMasive(mark: any) {
    if (mark !== null) {
      this.marks.push(mark);
    }
  }
  subjectFilterOnChange(event: MatSelectChange) {
    this.marks = [];
    this.store.select('marks').subscribe(x => {
      x.marksForChart.forEach(element => {
        if (element.indicator === event.value || event.value === 'ALL') {
          this.addToMasive(element);
        }
      });
    });
  }
}
