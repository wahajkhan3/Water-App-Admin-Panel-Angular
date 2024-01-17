import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { TaskService } from 'app/services/task.service';
import { UserServiceService } from 'app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
  submittaskForm: boolean = false;
  editButton: boolean = false;
  users:[]=[];
  constructor(private headerService:HeaderService, private userService:UserServiceService ,private toastr: ToastrService, private fb: FormBuilder, private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.taskForm = this.fb.group({
      userId: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      desc: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['', [Validators.required,]],
      taskStartFrom: ['', [Validators.required, ]],
      taskEndTo: ['', [Validators.required, ]],
      status: ['', ]

    })
  }
  ngOnInit(): void {

    this.headerService.task.next(true);

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.editButton = true;
    }
    if (id) {
      console.log(this.route.snapshot.params['id']);
      this.taskService.getbyIdTask(this.route.snapshot.params['id']).subscribe((result: any) => {
        let data = result.data;
        this.taskForm.patchValue({

          userId: data.userId,
          title: data.title,
          desc: data.desc,
          priority: data.priority,
          taskStartFrom: data.taskStartFrom,
          taskEndTo: data.taskEndTo,
          status: data.status,
        });
      });
    }

    this.userService.userList().subscribe((resp:any)=>{
      this.users = resp.data;
    })
  }

  ngOnDestroy(): void {
    this.headerService.task.next(false);
  }
  dateFromValidator(control: FormControl): { [s: string]: boolean } | null {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Set to yesterday
    const selectedDate = new Date(control.value);

    // Check if the selected date is not greater than yesterday
    if (selectedDate <= currentDate) {
      return { 'invalidDateFrom': true };
    }

    return null; // Validation passed
  }


  taskFormFunc() {

    
  if(!this.editButton && this.taskForm.valid){
      this.taskService.addTask(this.taskForm.value).subscribe((result) => {
        console.log('Successfully Added Schedule', result);
        this.router.navigateByUrl('/task/task-list');
      },
      (err)=>{
        this.toastr.error(err.error.message);
      });
    }
    if (this.editButton == true && this.taskForm.valid) {
      this.taskService.updateTask(this.route.snapshot.params['id'], this.taskForm.value)
        .subscribe((resp) => {
          console.log('Schedule Updated', resp);
          this.router.navigateByUrl('/task/task-list');
        },
        (err)=>{
          this.toastr.error(err.error.message);
        })
    }

  }
  showNotification(from, align) {
    this.submittaskForm = true;
    const id = this.route.snapshot.params['id'];


    if (!id && this.taskForm.valid) {
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
    if (!id && this.taskForm.invalid) {
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
    if (id && this.taskForm.valid) {
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
    if (id && this.taskForm.invalid) {
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
