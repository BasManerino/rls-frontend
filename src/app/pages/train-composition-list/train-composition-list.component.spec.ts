import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCompositionListComponent } from './train-composition-list.component';

describe('TrainCompositionListComponent', () => {
  let component: TrainCompositionListComponent;
  let fixture: ComponentFixture<TrainCompositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainCompositionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainCompositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
