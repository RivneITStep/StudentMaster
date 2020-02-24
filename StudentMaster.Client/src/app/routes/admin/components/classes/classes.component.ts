import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { ClassesService } from '@core/services/classes.service';
import { ClassModel } from '@core/models/classes-model';
import { GetSubject, GetClassStudents } from '@core/redux/actions/teacher.actions';
import { AddMarkComponent } from 'app/routes/teacher/components/add-mark/add-mark.component';
import { AddHomeworkComponent } from 'app/routes/teacher/components/add-homework/add-homework.component';
import { AdminService } from '@core/services/admin.service';
import { InviteUserComponent } from '../modal/invite-user/invite-user.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  constructor(public dialog: MatDialog, private store: Store<IAppState>, private admin: AdminService) {}
  displayedColumns: string[] = ['position', 'PIB', 'Marks', 'ControlMark'];
  dataSource: any;
  selectedClass = 0;

  classes = [];
  ngOnInit() {
    this.admin.getAllClasses().subscribe((data: ClassModel[]) => {
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
  inviteStudent(): void {
    const dialogRef = this.dialog.open(InviteUserComponent, {
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
