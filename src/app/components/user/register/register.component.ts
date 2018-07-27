import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  password: String;
  firstName: String;
  lastName: String;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
  }

  findUserByUsername(username) {
    this.service.findUserByUsername(username)
    .subscribe((user : User) => {
      if(user === null){
        const newuser = {
          username : this.username,
          password : this.password,
          firstName : this.firstName,
          lastName : this.lastName
        };
        this.service.createUser(newuser)
           .subscribe((userfromserver) => {
             console.log(userfromserver);
             this.router.navigate(['/user',userfromserver._id]);
           });
      }
    });
  }

}
