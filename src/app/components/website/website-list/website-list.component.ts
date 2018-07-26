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
  websiteName : String;
  websites: Website[];
  uid: String;
  website: Website;
  constructor(private service : WebsiteService, private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    //this.websites = this.service.findAllWebsites();
    this.activeRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      console.log(this.uid);
      //async call
      //this.websites = this.service.findWebsitesForUser(uid);

      //sync call with promise
      this.service.findWebsitesForUser(this.uid)
      .subscribe((websites) => {
        this.websites = websites;
      });
    });
  }

  createWebsite(name){
    const website : Website = new Website("",name,"",this.uid);
    this.service.createWebsite(this.uid, website)
    .subscribe((websites) => {
      this.websites = websites;
    });
  }

  deleteWebsite(id){;
    this.service.deleteWebsite(this.uid, id)
    .subscribe((websites) => {
      this.websites = websites;
    });
  }

  selectWebsite(id) {
    this.service.findWebsiteById(this.uid, id)
    .subscribe((website) => {
      this.website = website;
      this.websiteName = this.website.name;
    });
  }

  updateWebsite(name) {
    const newWebsite = new Website(this.website._id,name,this.website.description,this.uid);
    this.service.updateWebsite(this.uid, newWebsite)
    .subscribe((websites) => {
      this.websites = websites;
    });
  }

}
