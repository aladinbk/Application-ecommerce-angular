import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOffreComponent } from './new-offre.component';

describe('NewOffreComponent', () => {
  let component: NewOffreComponent;
  let fixture: ComponentFixture<NewOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
