import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursByFormationComponent } from './cours-by-formation.component';

describe('CoursByFormationComponent', () => {
  let component: CoursByFormationComponent;
  let fixture: ComponentFixture<CoursByFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursByFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursByFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
