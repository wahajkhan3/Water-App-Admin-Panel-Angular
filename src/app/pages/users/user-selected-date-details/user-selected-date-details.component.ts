import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { UserServiceService } from 'app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-selected-date-details',
  templateUrl: './user-selected-date-details.component.html',
  styleUrls: ['./user-selected-date-details.component.scss']
})
export class UserSelectedDateDetailsComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute,private userService: UserServiceService ,private headerService:HeaderService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  userSelectedDate(){
    this.userService.userSingleDateGet(this.route.snapshot.params['id'], this.route.snapshot.params['date'] ).subscribe((resp)=>{
      console.log(resp);
    })
  }

}
