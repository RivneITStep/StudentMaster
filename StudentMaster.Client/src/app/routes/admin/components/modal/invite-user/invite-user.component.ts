import { Component, OnInit, Inject } from '@angular/core';
import { ToolsService } from '@core/services/tools.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '@core/services/admin.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  constructor(
    private tools: ToolsService,
    public dialogRef: MatDialogRef<InviteUserComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  userEmail = '';
  isLoading = false;
  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.isLoading = true;
    this.adminService.inviteUser(this.userEmail, this.data.classId).subscribe(() => {
      this.tools.showNotification('User has been invited');
      this.isLoading = false;
      this.dialogRef.close();
    }, () => {
      this.isLoading = false;
      this.dialogRef.close();
    });
  }

}
