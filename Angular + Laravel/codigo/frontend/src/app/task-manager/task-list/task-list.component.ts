import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { TasksService } from '../../services/tasks.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  
  public tasks: Task[] = [];

  constructor(
    private tasksService: TasksService
  ) { }

  async ngOnInit() {
    this.tasks = await this.tasksService.getTasks();

  }

  OnDeletedTask(id: number){

    const index = this.tasks.findIndex(task => task.id == id);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  addTask(newTask: Task){
    this.tasks.push(newTask);
  }

}