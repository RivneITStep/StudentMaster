import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from '@core/services/tools.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { ChangeAvatar } from '@core/redux/actions/account.actions';
import {
  selectAccountError,
  selectAccountIsFailed,
  selectAccountIsLoading,
  selectAccountIsSuccess,
} from '@core/redux/selectors/account.selectors';
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
    private store: Store<IAppState>
  ) {
    if (!imageChangedEvent.target.files[0].type.indexOf('image')) {
    } else {
      this.tools.showNotification('Please select valid photo!');
      this.dialogRef.close();
    }

    this.store.pipe(select(selectAccountIsLoading)).subscribe(isLoading => {
      if (this.isLoading && !isLoading) {
        this.dialogRef.close();
      }
      this.isLoading = isLoading;
    });

    this.store.pipe(select(selectAccountIsSuccess)).subscribe(isSuccess => {
      if (isSuccess) {
        this.tools.showNotification('Success');
      }
    });

    this.store.pipe(select(selectAccountIsFailed)).subscribe(isFailed => {
      if (isFailed) {
        this.store.pipe(select(selectAccountError)).subscribe(error => {
          if (error != null) {
            this.tools.showNotification(error.message);
          }

        });
      }
    });
  }

  ngOnInit() {}
  imageCropped(event: ImageCroppedEvent) {
    console.log(event.file);
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    console.log('image loaded');
  }
  loadImageFailed() {
    console.log('error');
  }
  save() {
    this.store.dispatch(new ChangeAvatar( {base64: this.croppedImage} ));
  }
}
