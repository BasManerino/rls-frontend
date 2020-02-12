import { TestBed } from '@angular/core/testing';

import { TraincompositiondetailsService } from './traincompositiondetails.service';

describe('TraincompositiondetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraincompositiondetailsService = TestBed.get(TraincompositiondetailsService);
    expect(service).toBeTruthy();
  });
});
