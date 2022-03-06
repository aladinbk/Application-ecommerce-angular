import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExiperdComponent } from './exiperd.component';

describe('ExiperdComponent', () => {
  let component: ExiperdComponent;
  let fixture: ComponentFixture<ExiperdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExiperdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExiperdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
