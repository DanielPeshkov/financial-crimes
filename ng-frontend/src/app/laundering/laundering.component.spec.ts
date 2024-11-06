import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunderingComponent } from './laundering.component';

describe('LaunderingComponent', () => {
  let component: LaunderingComponent;
  let fixture: ComponentFixture<LaunderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
