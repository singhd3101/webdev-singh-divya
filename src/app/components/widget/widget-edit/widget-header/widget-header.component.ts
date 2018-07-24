import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @Input()
  widget : Widget;
  constructor() { }

  ngOnInit() {
  }

}
