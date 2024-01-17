import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'app/services/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  schedule: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  pageSizes: any = [5, 10 ,15, 20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;
  // showPopup: boolean = false;
  isConfirmationVisible: boolean = false;
  isActive: string = 'All';
  selectedScheduleId: number;
  constructor(private scheduleService: ScheduleService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
    this.onPageInputChange();
  }
  getList() {
    this.scheduleService.getScheduleList().subscribe((result: any) => {
      console.log(result);
      this.schedule = result.data.data;
      this.filterData();
      this.isLoading = false;

    });
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.getList();
  }

  filterUser(type: string) {
    if (type === 'All') {
      this.filteredData = this.schedule; // Show all data
      this.isActive = 'All';
    } else {
      this.filteredData = this.schedule.filter((item) => item.type === type);
    }
    // this.filteredData = this.admin.filter(item => item.status === status);
    this.isActive = type;
    if (type === 'All') {
      const allButton = document.getElementById('nav-all-tab');
      if (allButton) {
        allButton.focus();
      }
    }


  }
  filterData() {
    const filter = this.searchText.toLowerCase();
    // const filterNum= this.searchNumber.search();
    this.filteredData = this.schedule.filter((item: { type: string; }) => item.type.toLowerCase().includes(this.searchText.toLowerCase()));
    // this.filteredData = this.users.filter((item) => item.email.toLowerCase().includes(filter));
    // this.filteredData = this.users.filter((item) => item.id.includes(filter));
    // this.filteredData = this.users.filter((item) => item.role.toLowerCase().includes(filter));
    // this.filteredData = this.users.filter((item) => item.cnic.toLowerCase().includes(filter))
    this.currentPage = 1; // Reset pageIndex when filtering
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
  get visibleData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }
  onPageInputChange() {



    const totalPages = this.totalPages;

    // Parse the input value as an integer
    const newPage = parseInt(String(this.currentPage), 10);

    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      this.currentPage = newPage;

    }
  }

  schedulePassId(id:number){
    this.selectedScheduleId = id;
  }
  scheduleDel(id: number) {
    this.selectedScheduleId = id;
    this.scheduleService.delScheduleList(id).subscribe((resp) => {
      console.log('Service Deleted', resp);
      this.showNotification('top', 'right');
      // this.showPopup=true;
      this.ngOnInit();
    })

  }
  // openDeleteConfirmation() {

  //   this.isConfirmationVisible = true;
  // }

  // confirmDelete(id:number) {
  //   this.scheduleService.delScheduleList(id).subscribe((resp)=>{
  //     console.log('Service Deleted',resp);
  //     this.showNotification('top', 'right');
  //     // this.showPopup=true;
  //     this.ngOnInit();
  //   })
  //   this.isConfirmationVisible = false;
  // }

  // cancelDelete() {
  //   this.isConfirmationVisible = false;
  // }
  // closePopup() {
  //   this.showPopup = false;
  // }
  showNotification(from, align) {

    // const id = this.route.snapshot.params['id'];



    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Schedule has been <b>Deleted Successfully</b></span>',
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
