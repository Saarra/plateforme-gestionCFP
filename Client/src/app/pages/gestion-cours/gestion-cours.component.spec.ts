import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCoursComponent } from './gestion-cours.component';

describe('GestionCoursComponent', () => {
  let component: GestionCoursComponent;
  let fixture: ComponentFixture<GestionCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
