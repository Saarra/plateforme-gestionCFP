import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogueDetailComponent } from './catelogue-detail.component';

describe('CatelogueDetailComponent', () => {
  let component: CatelogueDetailComponent;
  let fixture: ComponentFixture<CatelogueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatelogueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
