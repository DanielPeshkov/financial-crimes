import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbezzlementComponent } from './embezzlement.component';

describe('EmbezzlementComponent', () => {
  let component: EmbezzlementComponent;
  let fixture: ComponentFixture<EmbezzlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbezzlementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbezzlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
