import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEmploisComponent } from './ajout-emplois.component';

describe('AjoutEmploisComponent', () => {
  let component: AjoutEmploisComponent;
  let fixture: ComponentFixture<AjoutEmploisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutEmploisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEmploisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
