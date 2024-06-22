import { NgModule } from '@angular/core';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-manager/login/login.component';
import { RegisterComponent } from './user-manager/register/register.component';
import { PageNotFoundComponent } from './utilities/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tasks', component: TaskManagerComponent},
  
  
  
  //Wild Card Route for 404 request 
  { path: '**', pathMatch: 'full',  
    component: PageNotFoundComponent }, 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
