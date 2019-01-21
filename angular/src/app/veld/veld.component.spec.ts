import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeldComponent } from './veld.component';

describe('VeldComponent', () => {
  let component: VeldComponent;
  let fixture: ComponentFixture<VeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
