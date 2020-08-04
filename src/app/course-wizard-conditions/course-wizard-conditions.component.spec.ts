import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWizardConditionsComponent } from './course-wizard-conditions.component';

describe('CourseWizardConditionsComponent', () => {
  let component: CourseWizardConditionsComponent;
  let fixture: ComponentFixture<CourseWizardConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWizardConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWizardConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
