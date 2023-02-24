import { TestBed } from '@angular/core/testing';

import { StatisticsPreviousService } from './statistics-previous.service';

describe('StatisticsPreviousService', () => {
  let service: StatisticsPreviousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsPreviousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
