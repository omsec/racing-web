import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseChampionshipComponent } from './browse-championship.component';

describe('BrowseChampionshipComponent', () => {
  let component: BrowseChampionshipComponent;
  let fixture: ComponentFixture<BrowseChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
