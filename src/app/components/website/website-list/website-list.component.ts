import { Component, OnInit } from '@angular/core';
import { Website } from '../../../models/website.model.client';
import { WEBSITES } from '../../../models/website.mock';
import { WebsiteService } from '../../../services/website.service.client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {

  /*websites: Website[] = WEBSITES; /*= [
    new Website("123","Facebook"),
    new Website("234","Youtube"),
    new Website("345","Gizmodo")
  ];*/

  websites: Website[];

  constructor(private service : WebsiteService, private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    //this.websites = this.service.findAllWebsites();
    this.activeRoute.params.subscribe((params) => {
      const uid = params['uid'];
      console.log(uid);
      //async call
      //this.websites = this.service.findWebsitesForUser(uid);

      //sync call with promise
      this.service.findWebsitesForUser(uid)
      .subscribe((websites) => {
        this.websites = websites;
      });
    });
  }

}
