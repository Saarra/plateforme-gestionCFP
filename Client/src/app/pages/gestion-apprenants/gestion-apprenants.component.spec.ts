import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionApprenantsComponent } from './gestion-apprenants.component';

describe('GestionApprenantsComponent', () => {
  let component: GestionApprenantsComponent;
  let fixture: ComponentFixture<GestionApprenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionApprenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionApprenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
