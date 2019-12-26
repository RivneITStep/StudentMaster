import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NOTIFY_OPTIONS, API } from '@core/config';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '@core/services/tools.service';
@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css'],
})
export class CropperComponent implements OnInit {
  croppedImage: any = null;
  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<CropperComponent>,
    @Inject(MAT_DIALOG_DATA) public imageChangedEvent: any,
    private tools: ToolsService,
    private http: HttpClient
  ) {
    if (!imageChangedEvent.target.files[0].type.indexOf('image')) {
    } else {
      this.tools.showNotification('Please select valid photo!');
      this.dialogRef.close();
    }
  }

  ngOnInit() {}
  imageCropped(event: ImageCroppedEvent) {
    console.log(event.file);
    this.croppedImage = event.file;
    // this.nS.show('Image Cropped', '#444');
  }
  imageLoaded() {
    console.log('image loaded');
  }
  loadImageFailed() {
    console.log('error');
    // show message
  }
  save() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.croppedImage);
    this.http.post(API + '/api/Account/change-avatar-image/', formData).subscribe(
      _ => {
        this.tools.showNotification('Your image will be updated in a few minutes!');
        this.isLoading = false;
        this.dialogRef.close();
      },
      _ => {
        this.isLoading = false;
      }
    );
  }
}
