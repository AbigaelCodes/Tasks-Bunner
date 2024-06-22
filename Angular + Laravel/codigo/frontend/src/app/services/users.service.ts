import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRegister } from '../interfaces/User';
import { lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  readonly API_BASE_URL: string = 'http://backend.mytasks.com/api';

  public options: {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
      | undefined;
    context?: HttpContext | undefined;
    observe?: 'body' | undefined;
    params?: HttpParams;
    reportProgress?: boolean | undefined;
    responseType?: 'json' | undefined;
    withCredentials?: boolean | undefined;
  } = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
    responseType: 'json',
    withCredentials: true,
  };

  constructor(private http: HttpClient,private cookieService: CookieService) {}

  async postLogin(user: User) {
    // Habilitar CSRF protection con sanctum
    let $result = await lastValueFrom(
      this.http.get('http://backend.mytasks.com/sanctum/csrf-cookie', this.options)
    );
    console.log('Resultado de req CSRF protect', $result);

    // Realizar login
    this.http.post(this.API_BASE_URL + '/login', user, this.options).subscribe(
      (resp: any) => {
        this.cookieService.set('access-token',resp.access_token)

        console.log('Respuesta correcta.', resp);
      },
      (error) => {
        console.log('Ha habido un error en la request', error);
      }
    );
  }

  postRegister(user: UserRegister) {
    // Habilitar CSRF protection con sanctum
    this.http
      .get('http://backend.mytasks.com/sanctum/csrf-cookie')
      .subscribe((response) => {
        console.log('Enviada protection CSRF');
      });

    // Realizar registro
    this.http.post(this.API_BASE_URL + '/register', user, this.options).subscribe(
      (resp) => {
        console.log('Respuesta correcta.', resp);
      },
      (error) => {
        console.log('Ha habido un error en la request', error);
      }
    );
  }
}
