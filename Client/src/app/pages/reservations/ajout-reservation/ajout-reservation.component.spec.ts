import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutReservationComponent } from './ajout-reservation.component';

describe('AjoutReservationComponent', () => {
  let component: AjoutReservationComponent;
  let fixture: ComponentFixture<AjoutReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
