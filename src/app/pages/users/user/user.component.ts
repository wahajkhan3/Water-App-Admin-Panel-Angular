import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators, ValidatorFn } from '@angular/forms';
import { passwordMatchValidator } from './passwordMatchValidator';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'app/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { baseUrl } from 'environments/environment';
import { LeaveService } from 'app/services/leave.service';
import { DesignationService } from 'app/services/designation.service';
import { HeaderService } from 'app/services/header.service';
import { EditedUser } from 'app/models/editUser';
import { userSignupError } from 'app/models/userSignupError';

// import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit, OnDestroy {
    userSignUpForm!: FormGroup;
    formData: any = new FormData();
    formDataEdit: any = new FormData();
    submitUserSignUp: boolean = false;
    editButton: boolean = false;
    selectedImage: File;
    leaveTypeUsers: [] = [];
    selectedUserId: number | null = null;
    userDesignation: [] = [];
    selectUserIdForDesig: number | null = null;
    // userError:{userSignupError};
    base: any = 'https://timemanagment.codeaugment.com/';
    constructor(private headerService: HeaderService, private designationService: DesignationService, private leaveTypeService: LeaveService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private userService: UserServiceService) {

        const id = this.route.snapshot.params['id'];
        if (id) {
            this.editButton = true;
        }
        if (this.editButton) {
            this.userSignUpForm = this.fb.group({
                name: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                // password: [null, [Validators.required, Validators.minLength(8)]],
                // passwordConfirm: [null, [Validators.required]],
                role: ['', [Validators.required]],
                joinDate: ['', [Validators.required]],
                employeeId: ['CAT-', [Validators.required]],
                contactNo: ['', [Validators.required, Validators.minLength(10)]],
                famContactNo: ['', [Validators.required, Validators.minLength(10)]],
                cnic: ['', [Validators.required, Validators.minLength(10)]],
                leaveTypeId: ['', [Validators.required]],
                designation: ['', Validators.required],
                address: ['', [Validators.required]],
                // image: ['',],
                schedule: ['', [Validators.required]],
                // age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),

                // designation: new FormControl([''])
            }
                , { validators: passwordMatchValidator }
            )

        }
        else {
            this.userSignUpForm = this.fb.group({
                name: ['', [Validators.required,]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(8)]],
                passwordConfirm: ['', [Validators.required]],
                role: ['', [Validators.required]],
                joinDate: ['', [Validators.required,]],
                employeeId: ['CAT-', [Validators.required]],
                contactNo: ['', [Validators.required, Validators.minLength(10)]],
                famContactNo: ['', [Validators.required, Validators.minLength(10)]],
                cnic: ['', [Validators.required, Validators.minLength(10)]],
                leaveTypeId: ['', [Validators.required]],
                designation: ['', Validators.required],
                address: ['', [Validators.required]],
                image: ['', [Validators.required]],
                schedule: ['', [Validators.required]],

                // age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
                // designation: new FormControl([''])
            }
                , { validators: passwordMatchValidator }
            )

        }
    }
    // desig = [
    //     {  name: 'Front-End Dev' },
    //     {  name: 'Back-End Dev' },
    //     {  name: 'DevOps' },
    //     {  name: 'CEO', disabled:true },
    // ]
    // selectedDesig: string = '';


    // userSignUp = new FormGroup({
    //     name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    //     email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    //     password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //     passwordConfirm: new FormControl('', [Validators.required]),
    //     role: new FormControl('',[Validators.required]),
    //     contactNo: new FormControl( '',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    //     famContactNo: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    //     cnic: new FormControl('',[Validators.required]),
    //     leaveTypeId: new FormControl('', [Validators.required]),
    //     designation: new FormControl('',Validators.required),
    //     address: new FormControl('', [Validators.required]),
    //     image: new FormControl(null,Validators.required),
    //     schedule: new FormControl('',Validators.required)
    //     // age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),

    //     // designation: new FormControl([''])
    // }
    // // , { validators: passwordMatchValidator }
    // )

    ngOnInit() {

        this.headerService.userSign.next(true);

        const id = this.route.snapshot.params['id'];

        if (id) {
            this.editButton = true;
        }
        if (id) {
            console.log(this.route.snapshot.params['id']);
            this.userService.getUserById(this.route.snapshot.params['id']).subscribe((result: any) => {
                let data = result.data;
                this.userSignUpForm.patchValue({

                    name: data.name,
                    email: data.email,
                    // password: data.password,
                    // passwordConfirm: data.password,
                    role: data.role,
                    contactNo: data.contactNo,
                    famContactNo: data.famContactNo,
                    cnic: data.cnic,
                    leaveTypeId: data.leaveTypeId,
                    designation: data.designation,
                    address: data.address,
                    schedule: data.schedule,
                    joinDate: data.joinDate,
                    employeeId: data.employeeId
                    // image: baseUrl + data.image,

                });
            });
        }

        this.leaveTypeService.listLeaveType().subscribe((resp: any) => {
            this.leaveTypeUsers = resp.data;
        });

        this.designationService.getDesignation().subscribe((resp: any) => {
            this.userDesignation = resp.data.data;
        });
        //     console.log(result);
        //     this.img_url=this.base+result.data.image,
        //     this.userSignUpForm = this.fb.group({
        //         name: [result.data['name'], [Validators.required, Validators.minLength(3)]],
        //         email: [result.data['email'], [Validators.required, Validators.email, Validators.maxLength(50)]],
        //         password: [result.data['password'], [Validators.required, Validators.minLength(2)]],
        //         passwordConfirm: [result.data['password'], [Validators.required]],
        //         role: [result.data['role'], [Validators.required]],
        //         contactNo: [result.data['contactNo'], [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
        //         famContactNo: [result.data['famContactNo'], [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
        //         cnic: [result.data['cnic'], [Validators.required]],
        //         leaveTypeId: [result.data['leaveTypeId'], [Validators.required]],
        //         designation: [result.data['designation'], Validators.required],
        //         address: [result.data['address'], [Validators.required]],
        //         image: [this.img_url, Validators.required],
        //         schedule: [result.data['schedule'], Validators.required]
        //     });

        // });
    }
    ngOnDestroy(): void {

        // this.headerService.adminsign.next(false);
        this.headerService.userSign.next(false);

    }
    onContactNumberInput(event: any) {
        const input = event.target;
        const value = input.value;

        // Check if the input contains non-numeric characters
        // if (/[^0-9]/.test(value)) {
        //   // If non-numeric characters are detected, clear the input
        //   input.value = '';
        // }
        // Remove any non-numeric characters from the input
        const numericValue = value.replace(/[^0-9]/g, '');

        // Update the input value with the cleaned numeric value
        input.value = numericValue;
    }
    uploadImage(event: any, input: any) {
        this.showNoti('top', 'right');
        const file = event.target.files[0];
        // this.fileSize = file.size;
        this.selectedImage = this.formData.append('image', file);
        // this.formDataEdit.appened('image', file);
        // const fileInput = event.target;
        // if (fileInput.files.length > 0) {
        //   this.selectedImage = fileInput.files[0];
        // }
    }
    addEditForm() {
        this.submitUserSignUp = true;

        if (!this.editButton) {
            this.formData.append('name', this.userSignUpForm.get('name')?.value);
            this.formData.append('email', this.userSignUpForm.get('email')?.value);
            this.formData.append('password', this.userSignUpForm.get('password')?.value);
            this.formData.append('contactNo', this.userSignUpForm.get('contactNo')?.value);
            this.formData.append('famContactNo', this.userSignUpForm.get('famContactNo')?.value);
            this.formData.append('role', this.userSignUpForm.get('role')?.value);
            this.formData.append('cnic', this.userSignUpForm.get('cnic')?.value);
            this.formData.append('leaveTypeId', this.userSignUpForm.get('leaveTypeId')?.value);
            this.formData.append('designation', this.userSignUpForm.get('designation')?.value);
            this.formData.append('address', this.userSignUpForm.get('address')?.value);
            this.formData.append('schedule', this.userSignUpForm.get('schedule')?.value);
            this.formData.append('joinDate', this.userSignUpForm.get('joinDate')?.value);
            this.formData.append('employeeId', this.userSignUpForm.get('employeeId')?.value);

            this.userService.SaveUserRegistration(this.formData).subscribe((resp: any) => {
                console.log("User has been registered!", resp);
                this.router.navigate(['/userlist']);
                this.toastr.success(resp.message);
            },
                (err) => {
                    // Assuming the error response is stored in 'err' object
                    // console.log(err.message);
                    if (err && err.message) {
                        const errorData = err.message;
                        this.toastr.error("Something went wrong!");
                        // this.toastr.error(err.message.email[0]);
                        //     if (errorData.employeeId) {
                        //         console.log("hello");
                        //         this.toastr.error(errorData.employeeId[0]); // Access the first error message in the array
                        //     }


                        //     if (errorData.email) {
                        //         this.toastr.error(errorData.email[0]);

                        //     }

                        //     if (errorData.password) {
                        //         this.toastr.error();

                        //     }
                        //     if (errorData.role) {
                        //         this.toastr.error();

                        //     }

                        //     if (errorData.contactNo) {
                        //         this.toastr.error();

                        //     }

                        //     if (errorData.famContactNo) {
                        //         this.toastr.error();

                        //     }
                        //     if (errorData.leaveTypeId) {
                        //         this.toastr.error();
                        //     }

                        //     if (errorData.cnic) {
                        //         this.toastr.error();
                        //     }

                        //     if (errorData.image) {
                        //         this.toastr.error();
                        //     }

                        //     if (errorData.designation) {
                        //         this.toastr.error();
                        //     }

                        //     if (errorData.joinDate) {
                        //         this.toastr.error();
                        //     }


                    }
                }
            );

        }

        // updateUserDetails() {
        if (this.editButton == true) {

            this.userService.editUser(this.route.snapshot.params['id'], this.userSignUpForm.value)
                .subscribe((result: EditedUser) => {

                    console.log('User has been edit successfully', result);
                    this.router.navigate(['/userlist']);
                    this.submitUserSignUp = true;
                },
                    (err: userSignupError) => {
                        // Assuming the error response is stored in 'err' object
                        // console.log(err.message);
                        if (err && err.message) {
                            // this.userError = err.message;
                            this.toastr.error();
                            // this.toastr.error(err.message.email[0]);
                            if (err.message.employeeId) {
                                this.toastr.error("Something went wrong");
                                // console.log("hello");
                                // this.toastr.error(errorData.employeeId[0]); // Access the first error message in the array
                            }


                            //     if (errorData.email) {
                            //         this.toastr.error(errorData.email[0]);

                            //     }

                            //     if (errorData.password) {
                            //         this.toastr.error();

                            //     }
                            //     if (errorData.role) {
                            //         this.toastr.error();

                            //     }

                            //     if (errorData.contactNo) {
                            //         this.toastr.error();

                            //     }

                            //     if (errorData.famContactNo) {
                            //         this.toastr.error();

                            //     }
                            //     if (errorData.leaveTypeId) {
                            //         this.toastr.error();
                            //     }

                            //     if (errorData.cnic) {
                            //         this.toastr.error();
                            //     }

                            //     if (errorData.image) {
                            //         this.toastr.error();
                            //     }

                            //     if (errorData.designation) {
                            //         this.toastr.error();
                            //     }

                            //     if (errorData.joinDate) {
                            //         this.toastr.error();
                            //     }


                        }
                    }
                )
        }
    }


    showNotification(from, align) {
        this.submitUserSignUp = true;
        const id = this.route.snapshot.params['id'];


        if (!id && this.userSignUpForm.valid) {
            this.toastr.success(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">User has been <b>Successfully Registered</b> - Thank you, you are registered now!</span>',
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
        if (!id && this.userSignUpForm.invalid) {
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">User details are <b>Not Valid</b> - Please try again and enter valid details.</span>',
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
        if (id && this.userSignUpForm.valid) {
            this.toastr.success(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">User has been <b>Successfully Edited</b> - Thank you!</span>',
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
        if (id && this.userSignUpForm.invalid) {
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">User has <b>Failed to Edit</b> - Please try again and enter valid details.</span>',
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
    // switch (color) {
    //   case 1:
    //     this.toastr.info(
    //     '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
    //       "",
    //       {
    //         timeOut: 4000,
    //         closeButton: true,
    //         enableHtml: true,
    //         toastClass: "alert alert-info alert-with-icon",
    //         positionClass: "toast-" + from + "-" + align
    //       }
    //     );
    //     break;
    // case 2:
    // break;
    //   case 3:
    //     this.toastr.warning(
    //     '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
    //       "",
    //       {
    //         timeOut: 4000,
    //         closeButton: true,
    //         enableHtml: true,
    //         toastClass: "alert alert-warning alert-with-icon",
    //         positionClass: "toast-" + from + "-" + align
    //       }
    //     );
    //     break;
    // case 4:
    // break;

    // default:
    //     break;
    // }


}
