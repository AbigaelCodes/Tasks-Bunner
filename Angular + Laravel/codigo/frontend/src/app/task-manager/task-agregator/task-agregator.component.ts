import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-agregator',
  templateUrl: './task-agregator.component.html',
  styleUrls: ['./task-agregator.component.css']
})
export class TaskAgregatorComponent implements OnInit {


  @Output() createdTaskEvent = new EventEmitter<Task>();
  public task: Task = {
    id: null!,
    user_id: null!,
    description: '',
    status: false,
    created_at: null!,
    completed_at: null!
  }

  constructor(private tasksService: TasksService) {
   }

  ngOnInit(): void {
  }

  async agregateTask(){
    let created = await this.tasksService.postNewTask(this.task);
    if (created){
      alert('Tarea creada correctamente.');
      this.createdTaskEvent.emit(this.task);
    }
  }

}
