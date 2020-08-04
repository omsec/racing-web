import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWizardBasicsComponent } from './course-wizard-basics.component';

describe('CourseWizardBasicsComponent', () => {
  let component: CourseWizardBasicsComponent;
  let fixture: ComponentFixture<CourseWizardBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWizardBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWizardBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
