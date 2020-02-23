import { Component, OnInit } from '@angular/core';
import { ClassesService } from '@core/services/classes.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMarkComponent } from '../add-mark/add-mark.component';
import { AddHomeworkComponent } from '../add-homework/add-homework.component';
import { GetSubject, GetClassStudents } from '@core/redux/actions/teacher.actions';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { ClassModel } from '@core/models/classes-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private store: Store<IAppState>, private classService: ClassesService) {}
  displayedColumns: string[] = ['position', 'PIB', 'Marks', 'ControlMark'];
  dataSource: any;
  selectedClass = 0;

  classes = [];
  ngOnInit() {
    this.classService.getClasses().subscribe((data: ClassModel[]) => {
      this.classes = data;
      if (data.length !== 0) {
        this.selectedClass = data[0].id;
        this.store.dispatch(new GetSubject(data[0].id));
        this.store.dispatch(new GetClassStudents(data[0].id));
      }

    })

    this.store.select('teacher').subscribe(data => {
      this.dataSource = data.students;
    });
  }
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AddMarkComponent, {
      width: '90%',
      data: { id, classId: this.selectedClass },
    });
    dialogRef.afterClosed();
  }
  addHomeWork(): void {
    const dialogRef = this.dialog.open(AddHomeworkComponent, {
      width: '90%',
      data: { classId: this.selectedClass },
    });
    dialogRef.afterClosed();
  }
  onChange(event: any) {
    this.selectedClass = this.classes[event].id;
    this.store.dispatch(new GetSubject(this.classes[event].id));
    this.store.dispatch(new GetClassStudents(this.classes[event].id));
  }
}
