import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsModel } from '@core/models/news-model';
import { AuthenticationService, adminRole } from '@core';

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
  ) {
      this.isAdmin = this.authService.HasRole(adminRole);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteNew(id) {
    console.log(id);
  }
}
