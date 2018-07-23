import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
@Injectable()

export class FlickrService {

  baseUrl = environment.baseUrl;

  key = "your-flickr-key";
  secret = "your-flickr-secret";
  urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.serach&format=json&api_key=API_KEY&text=TEXT";

  constructor(private _http: Http) {
  }

  searchPhotos(searchTerm: any){
    /*sends request to flickr serach api and returns with a promise
    when the promise resolves, response will contain an array of json
    objects representing the images that the query match*/
    const url = this.urlBase
    .replace('API-KEY', this.key)
    .replace('TEXT', searchTerm);
    return this._http.get(url);
  }

}
