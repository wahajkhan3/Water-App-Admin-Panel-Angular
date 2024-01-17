import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'app/pages/users/user/passwordMatchValidator';
import { DeliveryboyService } from 'app/services/deliveryboy.service';
import { HeaderService } from 'app/services/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery-boy-add',
  templateUrl: './delivery-boy-add.component.html',
  styleUrls: ['./delivery-boy-add.component.scss']
})
export class DeliveryBoyAddComponent implements OnInit {

  deliveryForm!: FormGroup;
  submitDeliveryForm: boolean = false;

  constructor(private fb: FormBuilder, private headerService: HeaderService, private deliveryService: DeliveryboyService, private toastr: ToastrService, private router: Router) {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(7)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      cnic: ['', Validators.required],

    }

      , { validators: passwordMatchValidator })
  }

  ngOnInit(): void {
    this.headerService.deliveryBoy.next(true);
  }
  ngOnDestroy() {
    this.headerService.deliveryBoy.next(false);
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


  addDB() {

    this.submitDeliveryForm = true;

    if (this.deliveryForm.valid) {
      this.deliveryService.addDeliveryBoy(this.deliveryForm.value).subscribe((result: any) => {
        console.log('Notification has been sent', result);
        this.toastr.success(result.message);

        this.router.navigate(['/deliveryboy/deliveryboy-list']);

      })
    }
  }
}
