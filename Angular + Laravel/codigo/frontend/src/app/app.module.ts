import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskListComponent } from './task-manager/task-list/task-list.component';
import { TasksService } from './services/tasks.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user-manager/login/login.component';
import { RegisterComponent } from './user-manager/register/register.component';
import { TaskAgregatorComponent } from './task-manager/task-agregator/task-agregator.component';
import { PageNotFoundComponent } from './utilities/page-not-found/page-not-found.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TaskComponent } from './task-manager/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskAgregatorComponent,
    TaskManagerComponent,
    TaskListComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    TasksService,
    HttpClient,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
