import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprenantsComponent } from './list-apprenants.component';

describe('ListApprenantsComponent', () => {
  let component: ListApprenantsComponent;
  let fixture: ComponentFixture<ListApprenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApprenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApprenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
