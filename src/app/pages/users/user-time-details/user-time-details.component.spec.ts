import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeDetailsComponent } from './user-time-details.component';

describe('UserTimeDetailsComponent', () => {
  let component: UserTimeDetailsComponent;
  let fixture: ComponentFixture<UserTimeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
