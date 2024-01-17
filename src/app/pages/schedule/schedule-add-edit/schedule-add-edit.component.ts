import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { ScheduleService } from 'app/services/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule-add-edit',
  templateUrl: './schedule-add-edit.component.html',
  styleUrls: ['./schedule-add-edit.component.scss']
})
export class ScheduleAddEditComponent implements OnInit,OnDestroy {
  scheduleForm!: FormGroup;
  submitScheduleForm: boolean = false;
  editButton: boolean = false;
  constructor(private headerService:HeaderService, private toastr:ToastrService,private fb: FormBuilder, private scheduleService: ScheduleService, private router: Router, private route: ActivatedRoute) {
    this.scheduleForm = this.fb.group({
      type: ['', [Validators.required]],
      timeIn: ['', [Validators.required]],
      timeOut: ['', [Validators.required]],
      late: ['', [Validators.required]]
    } , { validators: this.timeValidation })
  }

  ngOnInit(): void {

    this.headerService.schedule.next(true);

    const id = this.route.snapshot.params['id'];

    if (id) {
        this.editButton = true;
    }
    if (id) {
        console.log(this.route.snapshot.params['id']);
        this.scheduleService.getbyIdSchedule(this.route.snapshot.params['id']).subscribe((result: any) => {
            let data = result.data;
            this.scheduleForm.patchValue({

              type: data.type,
              timeIn: data.timeIn,
              timeOut: data.timeOut,
              late: data.late,
    

            });
        });
    }
  }
  ngOnDestroy(): void {
    this.headerService.schedule.next(false);
  }
  timeValidation(formGroup: FormGroup) {
    const timeIn = formGroup.get('timeIn')?.value;
    const timeOut = formGroup.get('timeOut')?.value;
    const late = formGroup.get('late')?.value;

    if (timeIn && timeOut && late) {
      const timeInMinutes = this.convertTimeToMinutes(timeIn);
      const timeOutMinutes = this.convertTimeToMinutes(timeOut);
      const lateMinutes = this.convertTimeToMinutes(late);

      if (timeOutMinutes <= timeInMinutes) {
        formGroup.get('timeOut')?.setErrors({ 'invalidTime': true });
      } else {
        formGroup.get('timeOut')?.setErrors(null);
      }

      if (lateMinutes <= timeInMinutes) {
        formGroup.get('late')?.setErrors({ 'invalidTime': true });
      } else {
        formGroup.get('late')?.setErrors(null);
      }
    }
  }

  convertTimeToMinutes(time: string): number {
    // Assuming time format is HH:mm (e.g., 08:30)
    const parts = time.split(':');
    if (parts.length === 2) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      return hours * 60 + minutes;
    }
    return 0; // Return 0 if time format is not valid
  }
  scheduleFormFunc() {
    if (!this.editButton && this.scheduleForm.valid) {

      this.scheduleService.postScheduleForm(this.scheduleForm.value).subscribe((result) => {
        console.log('Successfully Added Schedule', result);
        this.router.navigateByUrl('/schedule/schedule-list');
      });
    }
    if (this.editButton == true && this.scheduleForm.valid) {
      this.scheduleService.updateScheduleForm(this.route.snapshot.params['id'], this.scheduleForm.value)
        .subscribe((resp) => {
          console.log('Schedule Updated', resp);
          this.router.navigateByUrl('/schedule/schedule-list');
        })
    }

  }
  showNotification(from, align) {
    this.submitScheduleForm = true;
    // const id = this.route.snapshot.params['id'];


    if (this.scheduleForm.valid) {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Schedule operation has been <b>Done Successfully</b></span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
    if (this.scheduleForm.invalid) {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Details are <b>Not Valid</b> - Please try again and enter valid values.</span>',
        "",
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
  }
}
