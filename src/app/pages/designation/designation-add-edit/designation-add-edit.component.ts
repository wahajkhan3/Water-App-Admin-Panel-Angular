import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from 'app/services/designation.service';
import { HeaderService } from 'app/services/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-designation-add-edit',
  templateUrl: './designation-add-edit.component.html',
  styleUrls: ['./designation-add-edit.component.scss']
})
export class DesignationAddEditComponent implements OnInit {
  designationForm!: FormGroup;
  submitDesignationForm: boolean = false;
  editButton: boolean = false;
  data: any;
  constructor(private headerService: HeaderService, private designationService: DesignationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService) {
    this.designationForm = this.fb.group({
      designation: ['', [Validators.required, Validators.minLength(2)]],
      // annual: ['',[Validators.required]],
      // casual: ['',[Validators.required]],

    })
  }

  ngOnInit(): void {

    this.headerService.designation.next(true);

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.editButton = true;
    }
    if (id) {
      console.log(this.route.snapshot.params['id']);
      this.designationService.getbyIdDesignation(this.route.snapshot.params['id']).subscribe((result: any) => {
        this.data = result.data;
        this.designationForm.patchValue({
          designation: this.data.designation,
        });
      });
    }
  }
  ngOnDestroy(): void {
    this.headerService.designation.next(false);
  }
  designation() {
    this.submitDesignationForm = true
    if (!this.editButton && this.designationForm.valid) {
      // this.data.userId=this.route.snapshot.params['id'];
      this.designationService.addDesignation(this.designationForm.value).subscribe((result) => {
        console.log('Successfully added designation', result);
        this.router.navigateByUrl('/designation-list');

      }, (err) => {
        this.toastr.error(err.error.message);
      });
    }
    if (this.editButton == true && this.designationForm.valid) {
      this.designationService.updateDesignation(this.route.snapshot.params['id'], this.designationForm.value).subscribe((result) => {
        console.log('Successfully updated designation');
        this.router.navigateByUrl('/designation-list');

      },
        (err) => {
          this.toastr.error(err.error.message);
        }
      )
    }

  }


  showNotification(from, align) {
    this.submitDesignationForm = true;
    const id = this.route.snapshot.params['id'];


    if (!id && this.designationForm.valid) {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">New Designation has been <b>Successfully Added</b></span>',
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
    if (!id && this.designationForm.invalid) {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Desingation is <b>Not Valid</b> - Please try again.</span>',
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

    if (id && this.designationForm.valid) {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Designation has been <b>Successfully Updated</b></span>',
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
    if (id && this.designationForm.invalid) {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Desingation is <b>Not Valid</b> - Please try again.</span>',
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
