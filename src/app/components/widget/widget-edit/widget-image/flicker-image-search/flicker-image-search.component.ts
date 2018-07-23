import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../../../../services/flickr.service.client';

@Component({
  selector: 'app-flicker-image-search',
  templateUrl: './flicker-image-search.component.html',
  styleUrls: ['./flicker-image-search.component.css']
})
export class FlickerImageSearchComponent implements OnInit {

  photos : String;
  searchText: String;

  constructor(private service: FlickrService) { }

  ngOnInit() {
  }

  searchPhotos(){
    this.service
    .searchPhotos(this.searchText)
    .subscribe(
      (data: any) => {
        console.log(data);
        let val = data._body;
        val = val.replace('jsonFlickrApi(','');
        val = val.substring(0, val.length - 1);
        val = JSON.parse(val);
        console.log(val);
        this.photos = val.photos;
      }
    );
  }

  selectPhotos(){
    //invoked when image is selected from the response from flicker api
  }

}
