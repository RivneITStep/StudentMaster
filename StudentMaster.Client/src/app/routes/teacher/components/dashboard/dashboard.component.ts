import { Component, OnInit } from '@angular/core';
import { ClassesService } from '@core/services/classes.service';
import { MatDialog } from '@angular/material';
import { AddMarkComponent } from '../add-mark/add-mark.component';
import { AddHomeworkComponent } from '../add-homework/add-homework.component';
import { GetSubject, GetClassStudents } from '@core/redux/actions/teacher.actions';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private store: Store<IAppState>) {}
  displayedColumns: string[] = ['position', 'PIB', 'Marks', 'ControlMark'];
  dataSource: any;

  ngOnInit() {
    this.store.dispatch(new GetSubject(1));
    this.store.dispatch(new GetClassStudents(1));
    this.store.select('teacher').subscribe(data => {
      this.dataSource = data.students;
    });
  }
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AddMarkComponent, {
      width: '90%',
      data: { id, classId: 1 },
    });
    dialogRef.afterClosed();
  }
  addHomeWork(): void {
    const dialogRef = this.dialog.open(AddHomeworkComponent, {
      width: '90%',
      data: { classId: 1 },
    });
    dialogRef.afterClosed();
  }
}
