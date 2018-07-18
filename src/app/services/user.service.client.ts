import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import { User } from '../models/user.model.client';

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
    return this.users.find(function (user){
      return user.username == username && user.password === password
    });
  }

  findUserByCredentials(username) {
    return this.users.find(function (user){
      return user.username == username
    });
  }

}
