import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatListModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTabsModule,
  MatTableModule,
} from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    NgxSpinnerModule,
  ],
})
export class ScheduleModule {}
