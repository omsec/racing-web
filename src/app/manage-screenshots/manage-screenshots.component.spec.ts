import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenshotsComponent } from './manage-screenshots.component';

describe('ManageScreenshotsComponent', () => {
  let component: ManageScreenshotsComponent;
  let fixture: ComponentFixture<ManageScreenshotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageScreenshotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScreenshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
