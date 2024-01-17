import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'app/pages/users/user/passwordMatchValidator';
import { AreaService } from 'app/services/area.service';
import { HeaderService } from 'app/services/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-area-add',
  templateUrl: './area-add.component.html',
  styleUrls: ['./area-add.component.scss']
})
export class AreaAddComponent implements OnInit {
  notificationForm!: FormGroup;
  submitNotificationSend: boolean = false;

  constructor(private headerService:HeaderService,private fb:FormBuilder,private areaService:AreaService, private toastr:ToastrService, private router:Router) { 
    this.notificationForm = this.fb.group({
      name: ['',Validators.required],
      
    }
    )
  }

  ngOnInit(): void {
    // this.headerService.area.next(true);
    this.headerService.area.next(true);

  }
  ngOnDestroy(): void{
    this.headerService.area.next(false);
  }
  
  sendNotification(){

    this.submitNotificationSend=true;

    if(this.notificationForm.valid){
      this.areaService.addArea(this.notificationForm.value).subscribe((result:any)=>{
        console.log('Notification has been sent', result);
        this.toastr.success(result.message);
        
        this.router.navigate(['/area/area-list']);
        
      })
    }
  }


}
