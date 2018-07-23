import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid: String;
  user: User;
  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      //this.user = this.service.findUserById(this.uid);
      this.service.findUserById(this.uid)
      .subscribe((user : User) => {
        this.user = user;
      });
    });
  }

  updateUser(user){
    console.log("inside update profile");
    this.service.updateUser(user);
  }

}
