import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentModel } from '@core/models/student-model';
import { AdminService } from '@core/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { InviteUserComponent } from '../modal/invite-user/invite-user.component';
import { GetClassStudents } from '@core/redux/actions/teacher.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['pib', 'roles'];
  dataSource: MatTableDataSource<StudentModel>;
  pageSize = 10;
  pageIndex = 1;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private adminService: AdminService) {
   this.adminService.getAllUsers(1, 999).subscribe((x) => {
    this.dataSource = new MatTableDataSource(x.data);
    this.dataSource.paginator = this.paginator;
   });
  }

  ngOnInit() {

  }
  onRoles(id) {
    console.log(id);
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
}



