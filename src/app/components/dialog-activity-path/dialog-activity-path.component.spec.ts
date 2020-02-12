import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActivityPathComponent } from './dialog-activity-path.component';

describe('DialogActivityPathComponent', () => {
  let component: DialogActivityPathComponent;
  let fixture: ComponentFixture<DialogActivityPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogActivityPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActivityPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
