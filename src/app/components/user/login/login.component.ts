import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hello: String = "Hello from the component!!"
  username: String;
  passowrd: String;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
  }

  login(username: String, password: String){
    const user : User = this.service.findUserByCredentials(username, password);
    if(user){
      this.router.navigate(['/user/1']);
    }
  }

}
