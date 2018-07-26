import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import { Website } from '../models/website.model.client';
import { WEBSITES } from '../models/website.mock';

@Injectable()
export class WebsiteService {

  websites: Website[] = WEBSITES;
  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }

  findAllWebsites() {
    return this.websites;
  }

  findWebsitesForUser(uid: String) {
    const url = 'http://localhost:3100/api/user/' + uid + '/website';
    return this._http.get(url)
    .map((res : Response) => {
      return res.json();
    });
    //return this.websites;
  }

  createWebsite(uid, website) {
    const url = 'http://localhost:3100/api/user/' + uid + '/website';
    return this._http.post(url, website)
    .map((res : Response) => {
      return res.json();
    });
  }

  deleteWebsite(uid, id) {
    const url = 'http://localhost:3100/api/user/' + uid + '/website/' + id;
    return this._http.delete(url)
    .map((res : Response) => {
      return res.json();
    });
  }

  findWebsiteById(uid, id){
    const url = 'http://localhost:3100/api/user/' + uid + '/website/' + id;
    return this._http.get(url)
    .map((res : Response) => {
      return res.json();
    });
  }

  updateWebsite(uid, website){
    const url = 'http://localhost:3100/api/user/' + uid + '/website/' + website._id;
    return this._http.put(url, website)
    .map((res : Response) => {
      return res.json();
    });
  }
}
