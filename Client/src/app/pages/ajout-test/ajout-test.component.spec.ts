import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTestComponent } from './ajout-test.component';

describe('AjoutTestComponent', () => {
  let component: AjoutTestComponent;
  let fixture: ComponentFixture<AjoutTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
