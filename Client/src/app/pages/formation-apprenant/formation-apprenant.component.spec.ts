import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationApprenantComponent } from './formation-apprenant.component';

describe('FormationApprenantComponent', () => {
  let component: FormationApprenantComponent;
  let fixture: ComponentFixture<FormationApprenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationApprenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
