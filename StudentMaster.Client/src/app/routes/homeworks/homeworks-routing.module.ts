import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { AuthGuard } from '@core';

const routes: Routes = [{ path: '', component: HomeworksComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeworksRoutingModule {}
