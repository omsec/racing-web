import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChampionshipComponent } from './create-championship.component';

describe('CreateChampionshipComponent', () => {
  let component: CreateChampionshipComponent;
  let fixture: ComponentFixture<CreateChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
