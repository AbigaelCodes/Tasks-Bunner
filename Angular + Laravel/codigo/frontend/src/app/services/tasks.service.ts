import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/Task';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  readonly API_BASE_URL: string = environment.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  async getTasks(): Promise<Task[]> {
    let tasks: Task[] = [];

    let options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('access-token'),
      },
      withCredentials: true,
    };

    return new Promise((resolve, reject) => {
      this.http.get<any>(this.API_BASE_URL + '/tasks', options).subscribe(
        (resp) => {
          
          resp.tasks.forEach((task: Task) => {
            tasks.push({
              id: task.id,
              user_id: task.user_id,
              description: task.description,
              created_at: task.created_at,
              completed_at: task.completed_at,
              status: task.status,
            });
          });

          resolve(tasks);
        },
        (error) => {
          //Redirecto to Login
          if (error.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      );
    });
  }

  postNewTask(newTask: Task): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('access-token'),
        },
        withCredentials: true,
      };

      this.http
        .post(this.API_BASE_URL + '/tasks/create', newTask, options)
        .subscribe(
          (resp) => {
            
            console.log('Respuesta correcta.', resp);
            resolve(true);
          },
          (error) => {

            console.log('Ha habido un error en la request', error);

            //Redirec to Login
            if (error.status === 401) {

              this.router.navigateByUrl('/login');
              resolve(false);
            }
          }
        );
    });
  }

  postUpdateTask(newTask: Task): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('access-token'),
        },
        withCredentials: true,
      };

      this.http
        .post(this.API_BASE_URL + '/tasks/update', newTask, options)
        .subscribe(
          (resp) => {
            
            console.log('Respuesta correcta.', resp);
            resolve(true);
          },
          (error) => {

            console.log('Ha habido un error en la request', error);

            //Redirec to Login
            if (error.status === 401) {

              this.router.navigateByUrl('/login');
              resolve(false);
            }
          }
        );
    });
  }

  postDeleteTask(newTask: Task): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('access-token'),
        },
        withCredentials: true,
      };

      this.http
        .post(this.API_BASE_URL + '/tasks/delete', newTask, options)
        .subscribe(
          (resp) => {
            
            console.log('Respuesta correcta.', resp);
            resolve(true);
          },
          (error) => {

            console.log('Ha habido un error en la request', error);

            //Redirec to Login
            if (error.status === 401) {

              this.router.navigateByUrl('/login');
              resolve(false);
            }
          }
        );
    });
  }
}
