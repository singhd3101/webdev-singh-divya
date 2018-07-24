import { Component, OnInit } from '@angular/core';
import { WIDGETS } from '../../../models/widget.mock';
import { WidgetService } from '../../../services/widget.service.client';
import { Widget } from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: Widget[];

  constructor(private service: WidgetService) { }

  ngOnInit() {
    //this.widgets = this.service.findAllWidgets();
    this.service.findAllWidgets()
    .subscribe((widgets) => {
      this.widgets = widgets;
    });
  }



}
