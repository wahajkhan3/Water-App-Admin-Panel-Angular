import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { LeaveService } from 'app/services/leave.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-types',
  templateUrl: './leave-types.component.html',
  styleUrls: ['./leave-types.component.scss']
})
export class LeaveTypesComponent implements OnInit, OnDestroy {
  leavetypeForm!: FormGroup;
  submitLeaveType: boolean = false;
  editButton: boolean = false;
  constructor(private headerService:HeaderService, private fb:FormBuilder, private leaveService:LeaveService, private toastr:ToastrService, private router:Router, private route:ActivatedRoute) { 
    this.leavetypeForm= this.fb.group({
      name: ['',Validators.required],
      sick: ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      annual: ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      casual: ['',[Validators.required,Validators.pattern('^[0-9]*$')]]
    })
  }
  
  ngOnInit(): void {

    this.headerService.leave.next(true);

    const id = this.route.snapshot.params['id'];

    if (id) {
        this.editButton = true;
    }
    if (id) {
        console.log(this.route.snapshot.params['id']);
        this.leaveService.getbyIdLeaveType(this.route.snapshot.params['id']).subscribe((result: any) => {
            let data = result.data;
            this.leavetypeForm.patchValue({
              name: data.name,
              sick: data.sick,
              annual: data.annual,
              casual: data.casual,
              
    

            });
        });
    }
  }
  
  ngOnDestroy(): void {
    this.headerService.leave.next(false);
  }
  leavetype(){
   if(!this.editButton && this.leavetypeForm ){

     this.leaveService.addLeaveType(this.leavetypeForm.value).subscribe((result)=>{
       console.log('Successfully Added leave Type',result);
       this.router.navigateByUrl('/leave/leavetype-list');
      },
      (err)=>{
        this.toastr.error('Something went wrong!');
      });
    }
    if (this.editButton == true && this.leavetypeForm.valid) {
      this.leaveService.updateLeaveType(this.route.snapshot.params['id'], this.leavetypeForm.value)
        .subscribe((resp) => {
          console.log('Leave Type Updated', resp);
          this.router.navigateByUrl('/leave/leavetype-list');
        },(err)=>{
          this.toastr.error('Something went wrong!');
        })
    }
    
  }
  
  showNotification(from, align) {
    this.submitLeaveType = true;
    // const id = this.route.snapshot.params['id'];


    if (this.leavetypeForm.valid) {
        this.toastr.success(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Leave Types has been <b>Successfully Added</b></span>',
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
    if (this.leavetypeForm.invalid) {
        this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Leave Types are <b>Not Valid</b> - Please try again and enter valid values.</span>',
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
