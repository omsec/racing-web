import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWizardRestrictionsComponent } from './course-wizard-restrictions.component';

describe('CourseWizardRestrictionsComponent', () => {
  let component: CourseWizardRestrictionsComponent;
  let fixture: ComponentFixture<CourseWizardRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWizardRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWizardRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
