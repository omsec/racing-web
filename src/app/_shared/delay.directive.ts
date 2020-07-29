import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ewDelay]'
})
export class DelayDirective implements OnInit {
  @Input() ewDelay;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    },
    this.ewDelay);
  }
}
