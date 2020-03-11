import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesComponent } from './components/classes/classes.component';
import { UsersComponent } from './components/users/users.component';
import { ConsoleComponent } from './components/console/console.component';


const routes: Routes = [{path: 'classes', component: ClassesComponent},
                        {path: 'users', component: UsersComponent},
                        {path: 'console', component: ConsoleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
