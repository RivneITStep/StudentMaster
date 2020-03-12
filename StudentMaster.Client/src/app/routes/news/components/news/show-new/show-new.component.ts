import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsModel } from '@core/models/news-model';
import { AuthenticationService, adminRole } from '@core';
import { AdminService } from '@core/services/admin.service';

@Component({
  selector: 'app-show-new',
  templateUrl: './show-new.component.html',
  styleUrls: ['./show-new.component.css'],
})
export class ShowNewComponent {
  isAdmin = false;
  constructor(
    public dialogRef: MatDialogRef<ShowNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsModel,
    private authService: AuthenticationService,
    private adminService: AdminService
  ) {
      this.isAdmin = this.authService.HasRole(adminRole);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteNew(id) {
    this.adminService.removeNew(id).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
