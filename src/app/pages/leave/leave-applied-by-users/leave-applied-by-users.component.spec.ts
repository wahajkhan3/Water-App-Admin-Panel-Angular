import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAppliedByUsersComponent } from './leave-applied-by-users.component';

describe('LeaveAppliedByUsersComponent', () => {
  let component: LeaveAppliedByUsersComponent;
  let fixture: ComponentFixture<LeaveAppliedByUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAppliedByUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAppliedByUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
