import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/services/customer.service';
import { HeaderService } from 'app/services/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

 
  customerForm!: FormGroup;
  submitcustomerForm: boolean = false;

  constructor(private headerService:HeaderService,private fb: FormBuilder, private customerService:CustomerService, private toastr: ToastrService, private router:Router) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', Validators.required],
      type: ['', [Validators.required, Validators.minLength(4)]],
      areaId: ['', Validators.required],
      deliverBoyId: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.headerService.customer.next(true);
  }
  ngOnDestroy(): void{
    this.headerService.customer.next(false);
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


  addCustomer() {

    this.submitcustomerForm = true;

    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe((result: any) => {
        console.log('Notification has been sent', result);
        this.toastr.success(result.message);
        
        this.router.navigate(['/customer/customer-list']);

      })
    }
  }
}
