import { TestBed } from '@angular/core/testing';

import { StatisticsCurrentService } from './statistics-current.service';

describe('StatisticsCurrentService', () => {
  let service: StatisticsCurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsCurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
