import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { UserServiceService } from 'app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators, ValidatorFn } from '@angular/forms';
import { TimeDetails } from 'app/models/timeDetails';

@Component({
  selector: 'app-user-time-details',
  templateUrl: './user-time-details.component.html',
  styleUrls: ['./user-time-details.component.scss']
})
export class UserTimeDetailsComponent implements OnInit, OnDestroy {

  users: TimeDetails[] = <TimeDetails[]>[];
  // time: timeInOut[] = [];
  filterUser: TimeDetails[] = <TimeDetails[]>[];
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  selectedId: number = this.route.snapshot.params['id'];

  // hoveredDate: NgbDate | null = null;
  // fromDate: NgbDate | null = this.calendar.getToday();
  // toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

  hoveredDate: any | null = null;
  fromDate: any | null;
  toDate: any | null;
  showDateFilter: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService, private headerService: HeaderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.headerService.userSign.next(true);
    this.getList();
  }


  ngOnDestroy(): void {
    this.headerService.userSign.next(false);
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  getList() {
    this.userService.userChecksBreaksDetails(this.route.snapshot.params['id']).subscribe((resp: any) => {
      // this.users = resp.data;
      this.users = resp.data;

      console.log(this.users);

      // this.time = resp.data.timeInOut;
      // console.log(resp.data.timeInOut);
      // let data = resp.data.timeInOut;
      // console.log(data);
      // for(var item of data){
      //   this.time = item;
      //   console.log(this.time);
      // }
      // console.log(this.time);
      // this.selectedDate = resp.data.date;
      // this.forCheckInOut = resp.data.checkInOut.map((check: any) => {
      //   return {
      //     ...check,
      //     dates: check.checkIn.split(' ')[0],
      //     // checkOut: check.checkOut.split(' ')[0] // Extracting date part from check-in time
      //   };
      // });
      // this.forBreakInOut = resp.data.breakInOut.map((breaks:any)=>{
      //   return {
      //     ...breaks,
      //     datess: breaks.breakOut.split(' ')[0],
      //   }
      // });
      // this.forCheckLogs = resp.data.checkLogs;

      // console.log(this.users);
    },
      (err) => {
        this.toastr.success(err.err.message);
      });
  }

  dateRange(dateFrom: any, dateTo: any) {
    this.userService.userDateFilter(this.route.snapshot.params['id'], this.fromDate, this.toDate).subscribe((resp) => {
      console.log(resp);
    })
  }
  
  onDateSelection(date: any) {


    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    // let datefrom = ;
    console.log(this.formatDate(this.fromDate));
    console.log(this.formatDate(this.toDate));

    this.userService.userDateFilter(this.route.snapshot.params['id'], this.formatDate(this.fromDate), this.formatDate(this.toDate)).subscribe((resp: any) => {
      console.log(resp);
      this.filterUser = resp.data;
      this.showDateFilter = true;
    }),
      (err) => {
        // console.log(err.err.message);
        this.toastr.error('Data does not exist');
      };
  }

  resetDate() {
    this.fromDate = null;
    this.toDate = null;
    this.showDateFilter = false;
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  formatDate(date: NgbDateStruct | null): string {
    if (!date) return '';

    const year = date.year.toString().padStart(4, '0');
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  // filterData() {
  //   const filter = this.searchText.toLowerCase();
  //   // const filterNum= this.searchNumber.search();
  //   this.filteredData = this.users.filter((item: { type:string; }) => item.type.includes(this.searchText.toLowerCase()));
  //   // this.filteredData = this.users.filter((item) => item.email.toLowerCase().includes(filter));
  //   // this.filteredData = this.users.filter((item) => item.id.includes(filter));
  //   // this.filteredData = this.users.filter((item) => item.role.toLowerCase().includes(filter));
  //   // this.filteredData = this.users.filter((item) => item.cnic.toLowerCase().includes(filter))
  //   this.currentPage = 1; // Reset pageIndex when filtering
  // }
  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }
  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //   }
  // }

  // get totalPages() {
  //   return Math.ceil(this.filteredData.length / this.pageSize);
  // }
  // get visibleData() {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   return this.filteredData.slice(startIndex, endIndex);
  // }
  // onPageInputChange() {



  //   const totalPages = this.totalPages;

  //   // Parse the input value as an integer
  //   const newPage = parseInt(String(this.currentPage), 10);

  //   if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
  //     this.currentPage = newPage;

  //   }
  // }
}
