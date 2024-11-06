import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbezzlementsComponent } from './embezzlements.component';

describe('EmbezzlementsComponent', () => {
  let component: EmbezzlementsComponent;
  let fixture: ComponentFixture<EmbezzlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbezzlementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbezzlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
