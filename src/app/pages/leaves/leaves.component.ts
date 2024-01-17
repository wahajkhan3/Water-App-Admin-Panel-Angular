import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators, RequiredValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dateToValidator } from './dateToValidator';
import { dateFromValidator } from './dateFromValidator';
import { LeavesService } from 'app/services/leaves.service';


@Component({
    selector: 'leaves-cmp',
    moduleId: module.id,
    templateUrl: 'leaves.component.html'
})

export class leavesComponent implements OnInit {

    constructor(private toastr: ToastrService, private leaveService: LeavesService) { }
    submitLeaveForm: boolean = false;
    leaveForm = new FormGroup({
        reason: new FormControl('', [Validators.required]),
        dateFrom: new FormControl('', [Validators.required, dateFromValidator]),
        dateTo: new FormControl('', [Validators.required]),
        userID: new FormControl('', Validators.required)
    }
    )
    // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTRlNTM1NC1iZDY0LTRmYWUtYmUzOS0yNTczMGRkYzg2YmIiLCJqdGkiOiI3YWYxODk1YmYyNzZlY2E4MmU1OGM5ZDUyMzliMTNmNmExYWJlMjk0NTcyNmI4MmYyMTUwNmQ3NjUwNWJhZmU0MzhjYTRiZjBkYjM1ZWY0MCIsImlhdCI6MTY5NjcwMDc4My4zMTkyNTksIm5iZiI6MTY5NjcwMDc4My4zMTkyNjEsImV4cCI6MTcyODMyMzE4My4zMTg1NTgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.gdXtRkFYQ5KY4G7WM7o3bpoNz9YDR_dlig-8TB7v9DbolwJoREyzy2iDm7EDOty0xfNx8YvKUMNOtQZuPD5xSMB8mhlU9dV6BjTS_h-zXhClcqyQ3KhbjknAwoq42MoTVuYxaJZhIdz9XOeEE1IMjDrI1Mv2K0JhuwB9fs29WpWasB9Qn-GxK4IXNgPs5fVUIWYmBPcaUp5pyEgKECbUfImbhcr-0Yt47-W1z1-SDbnYT6lyLPY4x3Njejn7nOnL4RMpheKukAu2mhyLGWkr5W1pwqJARXW4xlYwEfUWOfYI15yu5M-YxaWt4cVifpTFqcgnQ6E5mznm5l0xr4luhTNppaPwIhfZrrMI1C2t9tvoKF8HB6G74ErokTf7r6IXGpinqVSg0c_zhNhPSQ3v7sOo1_s2i80mMcGmzbtZEPpHp8dsY9UGFBTwz2y-rsUlIjSg0M8wtH8F7YdIyot41Kx2vfnlcF450t_GHkaSZKNrB2ClyIBF2FjhHv_PgIO9mejtIxa41lkk5jGpcx_3cJrb6S46CG-n2mroLCQWUE9OK9nwGknRHZCBAp8XUlWd_0kr-NtzobxuEHPWy1-cCdDGfUaKiym62R8FHv8ukkM9ncaAsb7z9PaAY3Y8LhGP7Xrb0TB_C1f_FsCFWLhvomI6wsXGRCXPtjVco3yLQ90';
    // Custom validator function for dateFrom

    ngOnInit(): void {
        // this.submitLeave();
    }
    submitLeave() {
        this.leaveService.applyLeave(this.leaveForm.value).subscribe((resp) => {
            console.log('Success', resp);
        })
        this.submitLeaveForm = true;
    }

    showNotification(from, align) {
        if (this.leaveForm.valid) {
            this.toastr.success(
                //   '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Leave request has been <b>Sent Successfully </b> - Wait for the response!</span>',
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
        else if (this.leaveForm.invalid) {
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Leave request is <b>Not Valid</b> - Fill the form properly.</span>',
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
