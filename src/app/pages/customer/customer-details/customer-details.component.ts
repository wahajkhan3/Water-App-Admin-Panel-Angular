import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/services/customer.service';
import { HeaderService } from 'app/services/header.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerDetails: any = [];
  singleData: any;
  receivedData: string;
  isLoading:boolean=true;
  constructor(private headerService: HeaderService, private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.headerService.customer.next(true);

    this.customerService.getCustomerDetailById(this.route.snapshot.params['id']).subscribe((resp: any) => {
      this.isLoading=false;
      this.singleData = resp.data;
      console.log(resp.data);
      this.customerDetails = resp.data.getForm;
    })

 

  }


  ngOnDestroy(): void {
    this.headerService.customer.next(false);
  }



}
