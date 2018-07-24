import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import { Widget } from '../models/widget.model.client';
import { WIDGETS } from '../models/widget.mock';

@Injectable()
export class WidgetService {

  widgets: Widget[] = WIDGETS;
  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }

  findAllWidgets() {
    //return this.widgets;
    return this._http.get('http://localhost:3100/api/widget')
    .map((res : Response) => {
      return res.json();
    });
  }
}
