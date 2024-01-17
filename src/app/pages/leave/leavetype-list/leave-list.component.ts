import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'app/services/leave.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveTypeListComponent implements OnInit {
  leave: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  pageSizes: any = [5, 10, 15, 20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;
  selectedLeaveId: any;
  isConfirmationVisible: boolean = false;
  constructor(private leaveService: LeaveService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
    this.onPageInputChange();
  }
  getList() {
    this.leaveService.listLeaveType().subscribe((result: any) => {
      console.log(result);
      this.leave = result.data;
      
      this.filterData();
      this.isLoading = false;

    });
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.getList();
  }
  filterData() {
    const filter = this.searchText.toLowerCase();
    // const filterNum= this.searchNumber.search();
    this.filteredData = this.leave.filter((item: { created_at: string; name: string }) => { 
      return item.name.toString().includes(filter) || item.created_at.toString().includes(this.searchText.toLowerCase()) 
    });
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
  DelPassId(id:number){
    this.selectedLeaveId = id;
  }
  DelLeaveType(id: number) {
    this.selectedLeaveId= id;
    this.leaveService.delLeaveType(id).subscribe((resp) => {
      console.log('Service Deleted', resp);
      this.showNotification('top', 'right');
      this.ngOnInit();
    })

  }
  // openDeleteConfirmation() {

  //   this.isConfirmationVisible = true;
  // }

  // confirmDelete(id:number) {
  //   this.leaveService.delLeaveType(id).subscribe((resp)=>{
  //     console.log('Service Deleted',resp);
  //     this.showNotification('top', 'right');
  //     this.ngOnInit();
  //   })

  //   this.isConfirmationVisible = false;
  // }

  // cancelDelete() {
  //   this.isConfirmationVisible = false;
  // }
  showNotification(from, align) {

    // const id = this.route.snapshot.params['id'];



    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Leave Type has been <b>Deleted Successfully</b></span>',
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
