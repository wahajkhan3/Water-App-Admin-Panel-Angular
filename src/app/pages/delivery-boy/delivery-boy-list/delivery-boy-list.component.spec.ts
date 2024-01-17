import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyListComponent } from './delivery-boy-list.component';

describe('DeliveryBoyListComponent', () => {
  let component: DeliveryBoyListComponent;
  let fixture: ComponentFixture<DeliveryBoyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryBoyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryBoyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
