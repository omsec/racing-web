import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Content } from '../_models/content';
import { ContentService } from '../_services/content.service';

@Component({
  selector: 'ew-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content$: Observable<Content[]>;
  // contents: Content[];

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.content$ = this.contentService.getAll();
    // this.contentService.getAll().subscribe(res => this.contents = res);
  }
}
