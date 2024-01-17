import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationAddEditComponent } from './designation-add-edit.component';

describe('DesignationAddEditComponent', () => {
  let component: DesignationAddEditComponent;
  let fixture: ComponentFixture<DesignationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
