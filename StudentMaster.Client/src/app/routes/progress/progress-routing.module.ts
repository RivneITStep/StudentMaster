import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressComponent } from './components/progress/progress.component';
import { AuthGuard } from '@core';

const routes: Routes = [{ path: '', component: ProgressComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressRoutingModule {}
