import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    
  }

  onLogin(): void {
    this.userService.postLogin(this.user);
  }

}
