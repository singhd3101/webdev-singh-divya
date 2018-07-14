import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
@Injectable()

export class WebsiteService {


  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }


}
