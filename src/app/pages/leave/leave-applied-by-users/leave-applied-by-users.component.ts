import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'app/services/header.service';
import { LeaveService } from 'app/services/leave.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-applied-by-users',
  templateUrl: './leave-applied-by-users.component.html',
  styleUrls: ['./leave-applied-by-users.component.scss']
})
export class LeaveAppliedByUsersComponent implements OnInit, OnDestroy {
  leave: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  pageSizes: any = [5,10,15,20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;
  base: any = `https://timemanagment.codeaugment.com/`;
  isActive: string = 'All';

  showImageModal: boolean = false;
  currentImage: string = '';

  constructor(private headerService:HeaderService, private leaveService: LeaveService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.headerService.leave.next(true);
    this.getListAppliedbyUsers();
    this.onPageInputChange();

  }
  getListAppliedbyUsers() {
    this.leaveService.listLeaveAppliedByUser().subscribe((result: any) => {
      console.log(result);
      this.leave = result.data.data;
      this.filterData();
      this.isLoading = false;

    });
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.getListAppliedbyUsers();
  }
  ngOnDestroy(): void {
    this.headerService.leave.next(false);
  }
  onChangeStatus(event: Event, data: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    const requestBody = {
      status: selectedValue,
    };
    this.leaveService.updateLeaveAppliedByUserStatus(data.leaveId, requestBody).subscribe(
      (resp) => {
        data.status = selectedValue;
        console.log('Status Changed', resp);
        this.showNotification('top', 'right');
        this.getListAppliedbyUsers();
      }
    );
  }
  openImageModal(imageUrl: string) {
    this.currentImage = imageUrl;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.currentImage = '';
  }
  filterUser(status: string) {
    if (status === 'All') {
      this.filteredData = this.leave; // Show all data
      this.isActive = 'All';
    } else {
      this.filteredData = this.leave.filter((item) => item.status === status);
    }
    // this.filteredData = this.admin.filter(item => item.status === status);
    this.isActive = status;
    if (status === 'All') {
      const allButton = document.getElementById('nav-all-tab');
      if (allButton) {
        allButton.focus();
      }
    }


  }
  filterData() {
    const filter = this.searchText.toLowerCase();
    // const filterNum= this.searchNumber.search();
    this.filteredData = this.leave.filter((item: { name: string, reason:string, }) => {
      return item.name.toLowerCase().includes(filter) || item.reason.toLowerCase().includes(filter);
    });
    // this.filteredData = this.leave.filter((item: { id: number, created_at: string }) => {
    //   return item.created_at.toLowerCase().includes(filter) || item.id.toString().includes(filter);
    // });
    // this.filteredData = this.leave.filter((item: { created_at:string; }) => item.created_at.includes(this.searchText.toLowerCase()));
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

  showNotification(from, align) {

    // const id = this.route.snapshot.params['id'];



    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Leave Status has been <b>Changed Successfully</b></span>',
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
