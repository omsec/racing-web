import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWizardAdditionalComponent } from './course-wizard-additional.component';

describe('CourseWizardAdditionalComponent', () => {
  let component: CourseWizardAdditionalComponent;
  let fixture: ComponentFixture<CourseWizardAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWizardAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWizardAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
