import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectanimeComponent } from './selectanime.component';

describe('SelectanimeComponent', () => {
  let component: SelectanimeComponent;
  let fixture: ComponentFixture<SelectanimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectanimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectanimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
