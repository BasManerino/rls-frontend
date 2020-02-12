import { TestBed } from '@angular/core/testing';

import { TrainServiceService } from './train-service.service';

describe('TrainServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainServiceService = TestBed.get(TrainServiceService);
    expect(service).toBeTruthy();
  });
});
