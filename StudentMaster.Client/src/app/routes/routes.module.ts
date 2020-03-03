import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MarksChartComponent } from './dashboard/components/marks-chart/marks-chart.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { ClassmatesComponent } from './dashboard/components/classmates/classmates.component';
import { AvarageMarksComponent } from './dashboard/components/avarage-marks/avarage-marks.component';

const COMPONENTS = [DashboardComponent, LoginComponent, RegisterComponent, MarksChartComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ClassmatesComponent, AvarageMarksComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
