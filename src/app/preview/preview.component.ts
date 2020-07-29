import { Component, OnInit, Input } from '@angular/core';

import { Content } from '../_models/content';
import { Series, CarClass } from '../_models/domain-codes';

@Component({
  selector: 'ew-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() content: Content;

  SERIES = Series;
  CARCLASS = CarClass;

  constructor() { }

  ngOnInit(): void {
  }

}
