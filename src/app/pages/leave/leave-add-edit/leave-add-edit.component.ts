import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { LeaveService } from 'app/services/leave.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-add-edit',
  templateUrl: './leave-add-edit.component.html',
  styleUrls: ['./leave-add-edit.component.scss']
})
export class LeaveAddEditComponent implements OnInit, OnDestroy {
  leaveForm!:FormGroup;
  submitLeaveForm:boolean=false;
  editButton:boolean=false;
  data:any;
  constructor(private headerService:HeaderService, private router:Router, private leaveSerivce:LeaveService, private route:ActivatedRoute, private fb:FormBuilder, private toastr:ToastrService) {
      this.leaveForm=this.fb.group({
        sick: ['',[Validators.required]],
        annual: ['',[Validators.required]],
        casual: ['',[Validators.required]],
        
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
        this.leaveSerivce.getbyIdLeave(this.route.snapshot.params['id']).subscribe((result: any) => {
            this.data = result.data;
            this.leaveForm.patchValue({
              sick: this.data.sick,
              annual: this.data.annual,
              casual: this.data.casual,
            });
        });
    }
  }
  ngOnDestroy(): void {
    this.headerService.leave.next(false);
  }
  leave(){
    if(this.leaveForm.valid ){
      // this.data.userId=this.route.snapshot.params['id'];
      this.leaveSerivce.updateLeave(this.route.snapshot.params['id'] ,this.leaveForm.value).subscribe((result)=>{
        console.log('Successfully Added leave Type',result);
        this.router.navigateByUrl('/leave/leaves-list');
       });
     }
     }
     
        
   showNotification(from, align) {
    this.submitLeaveForm = true;
    // const id = this.route.snapshot.params['id'];


    if (this.leaveForm.valid) {
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
    if (this.leaveForm.invalid) {
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

  

