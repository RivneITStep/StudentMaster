import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '@shared';
import { AddMarkComponent } from './components/add-mark/add-mark.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';

@NgModule({
  declarations: [DashboardComponent, AddMarkComponent, AddHomeworkComponent, HomeworksComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModule],
  entryComponents: [AddMarkComponent, AddHomeworkComponent],
})
export class TeacherModule {}
