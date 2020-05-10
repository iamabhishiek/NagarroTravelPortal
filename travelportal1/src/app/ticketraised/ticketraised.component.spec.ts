import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketraisedComponent } from './ticketraised.component';

describe('TicketraisedComponent', () => {
  let component: TicketraisedComponent;
  let fixture: ComponentFixture<TicketraisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketraisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketraisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
