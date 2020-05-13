import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminticketviewComponent } from './adminticketview.component';

describe('AdminticketviewComponent', () => {
  let component: AdminticketviewComponent;
  let fixture: ComponentFixture<AdminticketviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminticketviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminticketviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
