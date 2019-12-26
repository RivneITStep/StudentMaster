import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { UserLayoutComponent } from '../theme/user-layout/user-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '@core';
import { RedirectGuard } from '@core/guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [RedirectGuard] },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
        canActivate: [RedirectGuard],
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
        data: { title: 'Teacher', titleI18n: 'Teacher' },
        canActivate: [AuthGuard],
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'Sessions' },
        canActivate: [AuthGuard],
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
        data: { title: 'News', titleI18n: 'News' },
        canActivate: [AuthGuard],
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
        data: { title: 'Schedule', titleI18n: 'Schedule' },
        canActivate: [AuthGuard],
      },
      {
        path: 'progress',
        loadChildren: () => import('./progress/progress.module').then(m => m.ProgressModule),
        data: { title: 'Progress', titleI18n: 'Progress' },
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', titleI18n: 'Profile' },
      },
      {
        path: 'homeworks',
        loadChildren: () => import('./homeworks/homeworks.module').then(m => m.HomeworksModule),
        data: { title: 'Homeworks', titleI18n: 'Home works' },
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
