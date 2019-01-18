import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupertypeComponent } from './supertype.component';

describe('SupertypeComponent', () => {
  let component: SupertypeComponent;
  let fixture: ComponentFixture<SupertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
