import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from 'app/auth/services/admin-login.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAdminLoggedIn = new BehaviorSubject<boolean>(false)
  submitAdminForm:boolean=false;
  constructor(private adminloginservice: AdminLoginService, private router: Router,private toastr:ToastrService, private route: ActivatedRoute) { }

  adminLoginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/dashboard');
    }
  }
  loginUser() {
    // let data= this.adminLoginForm.value;

    this.submitAdminForm=true;
    if (this.adminLoginForm.valid) {
      
      this.adminloginservice.adminLogin(this.adminLoginForm.value)

        .subscribe((result: any) => {
          if (result) {

            let token = result.data.token;
            this.adminloginservice.saveToken(token);
            // this.isAdminLoggedIn.next(true);
            // localStorage.setItem('token',result.data.token);
            this.router.navigateByUrl('/dashboard');
            this.toastr.success('Admin Logged in, Successfully');
          }
        },
        (error)=>{
          this.toastr.error(error.error.message);
        }
        )

    }
    else{
      this.toastr.error('Please fill both email and password');
    }
  }
  // )

  // .subscribe((resp: any) => {
  //   console.log('Successfully logged in', resp);

}

