import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit, AfterViewInit {

  @ViewChild(TaskListComponent) taskList!: TaskListComponent;
  constructor() {
   }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    console.log("Holaasds",this.taskList.tasks);
    
        
  }

  OnCreatedTask(task: Task){
    this.taskList.addTask(task);
  }

}
