import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessticketComponent } from './successticket.component';

describe('SuccessticketComponent', () => {
  let component: SuccessticketComponent;
  let fixture: ComponentFixture<SuccessticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
