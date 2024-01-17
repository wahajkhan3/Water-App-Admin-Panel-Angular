import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyAddComponent } from './delivery-boy-add.component';

describe('DeliveryBoyAddComponent', () => {
  let component: DeliveryBoyAddComponent;
  let fixture: ComponentFixture<DeliveryBoyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryBoyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryBoyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
