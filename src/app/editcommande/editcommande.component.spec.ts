import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommandeComponent } from './editcommande.component';

describe('EditcommandeComponent', () => {
  let component: EditcommandeComponent;
  let fixture: ComponentFixture<EditcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
