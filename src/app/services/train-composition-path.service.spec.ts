import { TestBed } from '@angular/core/testing';

import { TrainCompositionPathService } from './train-composition-path.service';

describe('TrainCompositionPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainCompositionPathService = TestBed.get(TrainCompositionPathService);
    expect(service).toBeTruthy();
  });
});
