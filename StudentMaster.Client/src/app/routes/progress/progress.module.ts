import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './components/progress/progress.component';
import { MaterialModule } from 'app/material.module';
import { ShowMarksComponent } from './components/showMarks/showMarks.component';
import { MarksListComponent } from './components/marks-list/marks-list.component';

@NgModule({
  declarations: [ProgressComponent, ShowMarksComponent, MarksListComponent],
  imports: [CommonModule, MaterialModule, ProgressRoutingModule],
  entryComponents: [ShowMarksComponent],
})
export class ProgressModule {}
