import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatchValidator } from 'app/pages/users/user/passwordMatchValidator';
import { AdminService } from 'app/services/admin.service';
import { DesignationService } from 'app/services/designation.service';
import { HeaderService } from 'app/services/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admin-create',
    templateUrl: './admin-create.component.html',
    styleUrls: ['./admin-create.component.scss']
})
export class AdminCreateComponent implements OnInit, OnDestroy {
    AdminSignUpForm!: FormGroup;
    formData: any = new FormData();
    formDataEdit: any = new FormData();
    submitUserSignUp: boolean = false;
    editButton: boolean = false;
    selectedImage: File;
    userDesignation: [] = [];
    selectDesignationId: any;
    //   designations: any[]=[];
    base: any = 'https://timemanagment.codeaugment.com/';
    constructor(private headerService: HeaderService, private designationService: DesignationService, private fb: FormBuilder, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private adminService: AdminService) {

        const id = this.route.snapshot.params['id'];
        if (id) {
            this.editButton = true;
        }

//         if (this.editButton) {
//             this.AdminSignUpForm = this.fb.group({
//             name: ['', [Validators.required,]],
//             email: ['', [Validators.required, Validators.email,]],
//             // password: ['', [Validators.required, Validators.minLength(8)]],
//             // passwordConfirm: ['', [Validators.required]],
//             //   joinDate: ['',Validators.required],
//             // employeeId: ['', Validators.required],
//             // role: ['', [Validators.required]],
//             contactNo: ['', [Validators.required, Validators.minLength(7)]],
//             famContactNo: ['', [Validators.required, Validators.minLength(7)]],
//             cnic: ['', [Validators.required]],
//             designation: ['', Validators.required],
//             address: ['', [Validators.required]],
//             // leaveTypeId: ['', [Validators.required]],
//             // image: [''],
//             // schedule: ['', Validators.required]
//             // age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),

//             // designation: new FormControl([''])
//         }
//             , { validators: passwordMatchValidator }
//         )
// }
//         else {
            this.AdminSignUpForm = this.fb.group({
                name: ['', [Validators.required,]],
                email: ['', [Validators.required, Validators.email,]],
                password: ['', [Validators.required, Validators.minLength(8)]],
                passwordConfirm: ['', [Validators.required]],
                //   joinDate: ['',Validators.required],
                // employeeId: ['', Validators.required],
                // role: ['', [Validators.required]],
                contactNo: ['', [Validators.required, Validators.minLength(7)]],
                famContactNo: ['', [Validators.required, Validators.minLength(7)]],
                cnic: ['', [Validators.required, Validators.minLength(7)]],
                // leaveTypeId: ['', [Validators.required]],
                designation: ['', Validators.required],
                address: ['', [Validators.required]],
                image: ['',[Validators.required]],
                // schedule: ['', Validators.required]
                // age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),

                // designation: new FormControl([''])
            }
                , { validators: passwordMatchValidator }
            )
        }
        // }


    ngOnInit() {


        const id = this.route.snapshot.params['id'];

        if (id) {
            this.editButton = true;
        }
        // if (id) {
        //     console.log(this.route.snapshot.params['id']);
        //     this.adminService.getByIdAdmin(this.route.snapshot.params['id']).subscribe((result: any) => {
        //         let data = result.data;
        //         this.AdminSignUpForm.patchValue({

        //             name: data.name,
        //             email: data.email,
        //             // password: data.password,
        //             // passwordConfirm: data.password,
        //             // joinDate: data.joinDate,
        //             // employeeId: data.employeeId,
        //             // role: data.role,
        //             contactNo: data.contactNo,
        //             famContactNo: data.famContactNo,
        //             cnic: data.cnic,
        //             // leaveTypeId: data.leaveTypeId,
        //             designation: data.designation,
        //             address: data.address,
        //             // schedule: data.schedule,
        //             // image: this.base + data.image,

        //         });
        //     });
        // }
        // this.designationService.getDesignation().subscribe((resp: any) => {
        //     this.userDesignation = resp.data.data;
        // });

        this.headerService.adminsign.next(true);

    }
    ngOnDestroy(): void {
        this.headerService.adminsign.next(false);
    }
    // uploadImage(event: any, input: any) {

    //     this.showNoti('top', 'right');
    //     const file = event.target.files[0];
    //     this.selectedImage = this.formData.append('image', file);

    // }

    // onContactNumberInput(event: any) {
    //     const input = event.target;
    //     const value = input.value;

    //     // Check if the input contains non-numeric characters
    //     // if (/[^0-9]/.test(value)) {
    //     //   // If non-numeric characters are detected, clear the input
    //     //   input.value = '';
    //     // }
    //     // Remove any non-numeric characters from the input
    //     const numericValue = value.replace(/[^0-9]/g, '');

    //     // Update the input value with the cleaned numeric value
    //     input.value = numericValue;
    // }

    addEditForm() {
        this.submitUserSignUp = true;

        // if (!this.editButton && this.AdminSignUpForm.valid) {
            // const contactNo = this.
            this.formData.append('name', this.AdminSignUpForm.get('name')?.value);
            this.formData.append('email', this.AdminSignUpForm.get('email')?.value);
            this.formData.append('password', this.AdminSignUpForm.get('password')?.value);
            // this.formData.append('role', this.AdminSignUpForm.get('role')?.value);
            // this.formData.append('contactNo', this.AdminSignUpForm.get('contactNo')?.value);
            // this.formData.append('famContactNo', this.AdminSignUpForm.get('famContactNo')?.value);
            // this.formData.append('cnic', this.AdminSignUpForm.get('cnic')?.value);
            // this.formData.append('leaveTypeId', this.AdminSignUpForm.get('leaveTypeId')?.value);
            // this.formData.append('designation', this.AdminSignUpForm.get('designation')?.value);
            // this.formData.append('address', this.AdminSignUpForm.get('address')?.value);
            // this.formData.append('schedule', this.AdminSignUpForm.get('schedule')?.value);


            this.adminService.addAdmin(this.formData).subscribe((resp) => {
                console.log("User has been registered!", resp);
                this.router.navigate(['/dashboard']);

            },
            );

        // }

        // updateUserDetails() {
        // if (this.editButton == true && this.AdminSignUpForm.valid) {

        //     this.adminService.updateAdmin(this.route.snapshot.params['id'], this.AdminSignUpForm.value)
        //         .subscribe((result) => {

        //             console.log('User has been edit successfully', result);
        //             this.router.navigate(['/admin/admin-list']);
        //             this.submitUserSignUp = true;
        //         })
        // }
    }


    showNotification(from, align) {

        this.submitUserSignUp = true;
        const id = this.route.snapshot.params['id'];


        if (!id && this.AdminSignUpForm.valid) {
            this.toastr.success(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Admin has been <b>Successfully Registered</b> - Thank you, you are registered now!</span>',
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
        if (!id && this.AdminSignUpForm.invalid) {
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Admin details are <b>Not Valid</b> - Please try again and enter valid details.</span>',
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
        if (id && this.AdminSignUpForm.valid) {

            this.toastr.success(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Admin has been <b>Successfully Edited</b> - Thank you!</span>',
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
        if (id && this.AdminSignUpForm.invalid) {
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Admin has <b>Failed to Edit</b> - Please try again and enter valid details.</span>',
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
    showNoti(from, align) {
        this.toastr.success(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Image has been <b>Uploaded Successfully</b> - Ready to be submitted</span>',
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

}
