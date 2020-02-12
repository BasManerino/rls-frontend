import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateTcmComponent } from './dialog-create-tcm.component';

describe('DialogCreateTcmComponent', () => {
  let component: DialogCreateTcmComponent;
  let fixture: ComponentFixture<DialogCreateTcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateTcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateTcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
