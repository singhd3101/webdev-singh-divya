import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { SharedService } from '../../../services/shared.service.client';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid: String;
  user: User;
  username: String;
  constructor(private router: Router, private sharedService : SharedService,
              private route: ActivatedRoute, private service: UserService) { }

  ngOnInit() {

    this.username = this.sharedService.user.username;
    this.uid = this.sharedService.user._id;
    console.log(this.sharedService.user);
    this.user = this.sharedService.user;
    /*this.route.params.subscribe(params => {
      this.uid = params['uid'];
      //this.user = this.service.findUserById(this.uid);
      this.service.findUserById(this.uid)
      .subscribe((user : User) => {
        this.user = user;
      });
    });*/
  }

  updateUser(user){
    console.log("inside update profile");
    //this.service.updateUser(user);
    this.service
      .updateUser(user)
      .subscribe((user) => {
        this.user = user;
        this.ngOnInit();
      });
  }

  logout(){
    this.service.logout()
      .subscribe((status) => {
        this.router.navigate(['/login']);
      });
  }

}
