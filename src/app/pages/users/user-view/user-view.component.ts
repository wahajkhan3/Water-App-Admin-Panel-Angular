import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { UserServiceService } from 'app/services/user-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  base:any=`https://timemanagment.codeaugment.com/`;
  details:any;
  constructor(private headerService:HeaderService, private userService:UserServiceService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.userDetails(this.route.snapshot.params['id']).subscribe((result: any) => {
      this.details = result.data;
      console.log('ID: ',this.route.snapshot.params['id'],', ID Fetched',result);

      this.isLoading=false;
     
    });

    this.headerService.userSign.next(true);
    
  }

  ngOnDestroy(): void {
    this.headerService.userSign.next(false);
  }


}
