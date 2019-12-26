import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeworksRoutingModule } from './homeworks-routing.module';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [HomeworksComponent],
  imports: [CommonModule, HomeworksRoutingModule, SharedModule],
})
export class HomeworksModule {}
