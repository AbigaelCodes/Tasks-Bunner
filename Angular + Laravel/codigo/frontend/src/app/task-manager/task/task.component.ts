import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit, Task {

  @Output() deletedEvent = new EventEmitter<number>();
  @Input() data: Task = null!;
  id: number = null!;
  user_id: number = null!;
  description: string = null!;
  status: boolean = null!;
  created_at: Date = null!;
  completed_at: Date = null!;
  
  constructor(private tasksService: TasksService) {
  }


  ngOnInit(): void {
    this.id = this.data.id;
    this.user_id = this.data.user_id;
    this.description = this.data.description;
    this.status = this.data.status;
    this.created_at = this.data.created_at;
    this.completed_at = this.data.completed_at;
  }

  async taskDone() {
    let updated = await this.tasksService.postUpdateTask(this.data);
    if (updated)
      alert('Tarea actualizada correctamente.');
  }

  async deleteTask() {
    let deleted = await this.tasksService.postDeleteTask(this.data);
    if (deleted){
      alert('Tarea eliminada correctamente.');
      this.deletedEvent.emit(this.id);

    }
  }



}
