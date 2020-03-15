import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '@core';
import { HomeworksComponent } from './components/homeworks/homeworks.component';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                        { path: 'homeworks', component: HomeworksComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
