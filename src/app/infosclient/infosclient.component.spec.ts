import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosclientComponent } from './infosclient.component';

describe('InfosclientComponent', () => {
  let component: InfosclientComponent;
  let fixture: ComponentFixture<InfosclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
