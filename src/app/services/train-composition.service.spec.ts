import { TestBed } from '@angular/core/testing';

import { TrainCompositionService } from './train-composition.service';

describe('TrainCompositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainCompositionService = TestBed.get(TrainCompositionService);
    expect(service).toBeTruthy();
  });
});
