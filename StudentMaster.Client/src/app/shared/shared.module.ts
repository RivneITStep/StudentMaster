import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MiniProgressComponent } from './components/mini-progress/mini-progress.component';
import { Text3dComponent } from './components/text3d/text3d.component';
import { ErrorCodeComponent } from './components/error-code/error-code.component';
import { CropperComponent } from './components/cropper/cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ShowImgComponent } from './components/show-img/show-img.component';
import { LoadingFailedComponent } from './components/loading-failed/loading-failed.component';
import { LoadingComponent } from './components/loading/loading.component';

const THIRD_MODULES = [
  MaterialModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgSelectModule,
  FormlyModule,
  FormlyMaterialModule,
  ImageCropperModule,
];
const COMPONENTS = [
  BreadcrumbComponent,
  PageHeaderComponent,
  MiniProgressComponent,
  Text3dComponent,
  CropperComponent,
  ErrorCodeComponent,
  LoadingFailedComponent,
  LoadingComponent,
];
const DIRECTIVES = [];
const PIPES = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES, ShowImgComponent],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...THIRD_MODULES],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: [CropperComponent],
})
export class SharedModule {}
