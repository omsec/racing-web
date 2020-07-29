import { Component, OnInit, TemplateRef, HostBinding } from '@angular/core';
import { AppToastService } from '../_services/app-toast.service';

@Component({
  selector: 'ew-app-toast',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.css'],
  // host: {'[class.ngb-toasts]': 'true'} // veraltet
})
export class AppToastComponent implements OnInit {
  @HostBinding('class.ngb-toasts') toast = true;

  constructor(public toastService: AppToastService) { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  ngOnInit(): void {
  }

}
