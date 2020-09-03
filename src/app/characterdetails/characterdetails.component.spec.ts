import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterdetailsComponent } from './characterdetails.component';

describe('CharacterdetailsComponent', () => {
  let component: CharacterdetailsComponent;
  let fixture: ComponentFixture<CharacterdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
