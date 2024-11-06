import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunderingsComponent } from './launderings.component';

describe('LaunderingsComponent', () => {
  let component: LaunderingsComponent;
  let fixture: ComponentFixture<LaunderingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunderingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunderingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
