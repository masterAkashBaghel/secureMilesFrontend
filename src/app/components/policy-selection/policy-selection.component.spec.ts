import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySelectionComponent } from './policy-selection.component';

describe('PolicySelectionComponent', () => {
  let component: PolicySelectionComponent;
  let fixture: ComponentFixture<PolicySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicySelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
