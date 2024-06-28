import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkPurchaseComponent } from './milk-purchase.component';

describe('MilkPurchaseComponent', () => {
  let component: MilkPurchaseComponent;
  let fixture: ComponentFixture<MilkPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilkPurchaseComponent]
    });
    fixture = TestBed.createComponent(MilkPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
