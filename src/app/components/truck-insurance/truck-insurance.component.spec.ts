import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckInsuranceComponent } from './truck-insurance.component';

describe('TruckInsuranceComponent', () => {
  let component: TruckInsuranceComponent;
  let fixture: ComponentFixture<TruckInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckInsuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
