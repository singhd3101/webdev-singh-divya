import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import { User } from '../models/user.model.client';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {

  users: User[] = [
    new User("123","alice","qq"),
    new User("234","bob","qq"),
    new User("345","charlie","qq"),
  ];

  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
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
    return this.users.find(function (user){
      return user.username == username
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

  updateUser(user: User) {
    console.log("inside service client");
    for(let i=0; i<this.users.length; i++){
      const _user = this.users[i];
      if (_user._id === user._id) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
      }
    }
  }
}
