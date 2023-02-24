import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCurrentComponent } from './statistics-current.component';

describe('StatisticsCurrentComponent', () => {
  let component: StatisticsCurrentComponent;
  let fixture: ComponentFixture<StatisticsCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsCurrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
