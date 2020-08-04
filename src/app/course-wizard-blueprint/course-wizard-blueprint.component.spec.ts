import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWizardBlueprintComponent } from './course-wizard-blueprint.component';

describe('CourseWizardBlueprintComponent', () => {
  let component: CourseWizardBlueprintComponent;
  let fixture: ComponentFixture<CourseWizardBlueprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWizardBlueprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWizardBlueprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
