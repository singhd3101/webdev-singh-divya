import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model.client';
import { Observable} from 'rxjs/Rx';
import { SharedService } from './shared.service.client';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  users: User[] = [
    new User("123","alice","qq"),
    new User("234","bob","qq"),
    new User("345","charlie","qq"),
  ];

  baseUrl = environment.baseUrl;
  options : RequestOptions = new RequestOptions();

  constructor(private router : Router, private sharedService : SharedService, private _http: Http) {
  }

  findUserByCredentials(username, password) {
    /*return this.users.find(function (user){
      return user.username == username && user.password === password
    });*/
    /*const url = ''; */
    return this._http.get('http://localhost:3100/api/user?username='+ username +'&password=' + password)
    .map(
      (response: Response) => {
        return response.json();
      });
  }

  findUserByUsername(username) {
    /*return this.users.find(function (user){
      return user.username == username
    });*/
    return this._http.get('http://localhost:3100/api/user?username='+ username)
    .map(
      (response: Response) => {
        return response.json();
      });
  }

  findUserById(_id) {
    /*return this.users.find(function (user){
      return user._id == _id
    });*/

    //calling express web services
    /*return this._http.get(this.baseUrl + '/api/user/' + _id)
    .map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );*/
    const url = 'http://localhost:3100/api/user/' + _id;
    return this._http.get(url)
    .map((response: Response) => {
      return response.json();
    });
  }

  updateUser(user : User) {
    console.log("inside update service client");
    /*for(let i=0; i<this.users.length; i++){
      const _user = this.users[i];
      if (_user._id === user._id) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
      }
    }*/
    const url = 'http://localhost:3100/api/user/' + user._id;
    return this._http.put(url, user)
    .map((response: Response) => {
      return response.json();
    });
  }

  createUser(user) {
    const url = 'http://localhost:3100/api/user/';
    return this._http.post(url, user)
    .map((response: Response) => {
      return response.json();
    });
  }

  register(username, password) {
    const url = 'http://localhost:3100/api/register/';
    const credentials = {
      username : username,
      password : password
    };
    this.options.withCredentials = true;
    return this._http.post(url, credentials, this.options)
      .map((res : Response) => {
        return res.json();
      });
  }

  login(username, password) {
    const url = 'http://localhost:3100/api/login/';
    const credentials = {
      username : username,
      password : password
    };
    this.options.withCredentials = true;
    return this._http.post(url, credentials, this.options)
      .map((res : Response) => {
        return res.json();
      });
  }

  loggedIn() {
    const url = 'http://localhost:3100/api/loggedIn/';
    this.options.withCredentials = true;
    return this._http.post(url, '', this.options)
      .map((res : Response) => {
        const user = res.json();
        if(user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  logout(){
    const url = 'http://localhost:3100/api/logout/';
    this.options.withCredentials = true;
    return this._http.post(url, '', this.options)
      .map((res : Response) => {
        return res;
      });
  }
}
