import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsModel } from '@core/models/news-model';

@Component({
  selector: 'app-show-new',
  templateUrl: './show-new.component.html',
  styleUrls: ['./show-new.component.css'],
})
export class ShowNewComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
