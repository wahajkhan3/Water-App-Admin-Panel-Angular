import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectedDateDetailsComponent } from './user-selected-date-details.component';

describe('UserSelectedDateDetailsComponent', () => {
  let component: UserSelectedDateDetailsComponent;
  let fixture: ComponentFixture<UserSelectedDateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectedDateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSelectedDateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
