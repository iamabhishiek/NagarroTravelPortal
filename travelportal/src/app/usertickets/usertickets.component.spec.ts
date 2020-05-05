import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserticketsComponent } from './usertickets.component';
describe('UserticketsComponent', () => {
  let component: UserticketsComponent;
  let fixture: ComponentFixture<UserticketsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserticketsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
