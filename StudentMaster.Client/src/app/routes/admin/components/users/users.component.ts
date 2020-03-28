import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentModel } from '@core/models/student-model';
import { AdminService } from '@core/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { InviteUserComponent } from '../modal/invite-user/invite-user.component';
import { GetClassStudents } from '@core/redux/actions/teacher.actions';
import { ChangeRolesComponent } from '../modal/change-roles/change-roles.component';
import { EditSubjectsInTeacherComponent } from '../modal/edit-subjects-in-teacher/edit-subjects-in-teacher.component';
import { AuthenticationService } from '@core';
import { ChangeClassInStudentComponent } from '../modal/change-class-in-student/change-class-in-student.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['pib', 'roles'];
  dataSource: MatTableDataSource<StudentModel>;
  pageSize = 10;
  pageIndex = 0;
  myUID = '';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private adminService: AdminService, private authService: AuthenticationService) {

  }
  LoadUsers() {
    this.adminService.getAllUsers(1, 999).subscribe((x) => {
      this.dataSource = new MatTableDataSource(x.data);
      this.dataSource.paginator = this.paginator;
     });
  }
  ngOnInit() {
    this.LoadUsers();
    this.myUID = this.authService.getUserId();
  }
  onRoles(id) {
    const dialogRef = this.dialog.open(ChangeRolesComponent, {
      width: '90%',
      data: { uid: id },
    });
    dialogRef.afterClosed().subscribe(() => { this.LoadUsers();});
  }
  addUser() {
    const dialogRef = this.dialog.open(InviteUserComponent, {
      width: '90%',
      data: { classId: 0 },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.adminService.getAllUsers(1, 999).subscribe((x) => {
        this.dataSource = new MatTableDataSource(x.data);
        this.dataSource.paginator = this.paginator;
       });
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editClass(uid) {
    const dialogRef = this.dialog.open(ChangeClassInStudentComponent, {
      width: '90%',
      data: { uid },
    });
    dialogRef.afterClosed();
  }
  editSubjects(uid) {
    const dialogRef = this.dialog.open(EditSubjectsInTeacherComponent, {
      width: '90%',
      data: { teacherId: uid },
    });
    dialogRef.afterClosed();
  }
}



