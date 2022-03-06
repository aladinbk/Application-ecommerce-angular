import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatComponent } from './addcat.component';

describe('AddcatComponent', () => {
  let component: AddcatComponent;
  let fixture: ComponentFixture<AddcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
