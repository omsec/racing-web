import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipHomeComponent } from './championship-home.component';

describe('ChampionshipHomeComponent', () => {
  let component: ChampionshipHomeComponent;
  let fixture: ComponentFixture<ChampionshipHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionshipHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
