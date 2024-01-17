import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationForm!: FormGroup;
  submitNotificationSend: boolean = false;


  constructor(private fb: FormBuilder, private notificationService: NotificationService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {
    this.notificationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
  }

  sendNotification(){

    this.submitNotificationSend=true;

    if(this.notificationForm.valid){
      this.notificationService.addNotification(this.notificationForm.value).subscribe((result)=>{
        console.log('Notification has been sent', result);
        
      })
    }
  }

  showNotification(from, align) {

    this.submitNotificationSend = true;


    if (this.notificationForm.valid) {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Notification has been <b>Sent Successfully</b> - Users will get your message.</span>',
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
    if (this.notificationForm.invalid) {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Details are <b>Not Valid</b> - Users will not get your message.</span>',
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
