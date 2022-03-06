import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcatComponent } from './editcat.component';

describe('EditcatComponent', () => {
  let component: EditcatComponent;
  let fixture: ComponentFixture<EditcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
