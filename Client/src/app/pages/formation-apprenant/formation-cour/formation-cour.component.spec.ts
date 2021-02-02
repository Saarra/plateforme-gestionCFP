import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationCourComponent } from './formation-cour.component';

describe('FormationCourComponent', () => {
  let component: FormationCourComponent;
  let fixture: ComponentFixture<FormationCourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationCourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
