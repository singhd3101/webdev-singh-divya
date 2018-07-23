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
  errorFlag: Boolean;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
  }

  login(username: String, password: String){
    //only for client web servies
    /*const user : User = this.service.findUserByCredentials(username, password);
    if(user){
      this.router.navigate(['/user',user._id]);
    }*/

    //subscribing to observable from express web service
    this.service.findUserByCredentials(username, password)
    .subscribe((user : User) => {
      if(user){
        this.router.navigate(['/user',user._id]);
      }
    })
  }

}
