import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPreviousComponent } from './statistics-previous.component';

describe('StatisticsPreviousComponent', () => {
  let component: StatisticsPreviousComponent;
  let fixture: ComponentFixture<StatisticsPreviousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsPreviousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsPreviousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
