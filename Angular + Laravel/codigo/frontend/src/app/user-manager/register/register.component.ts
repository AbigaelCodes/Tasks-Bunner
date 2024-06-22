import { Component, OnInit } from '@angular/core';
import { User, UserRegister } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: UserRegister = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.userService.postRegister(this.user);
  }

}
