import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'app/services/header.service';
import { LeaveService } from 'app/services/leave.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit, OnDestroy {
  leave: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  pageSizes: any = [5,10,15,20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;
  isActive:string='';

  constructor(private headerService:HeaderService, private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.getList();
    this.onPageInputChange();

    this.headerService.leave.next(true);
  }
  ngOnDestroy(): void {
    this.headerService.leave.next(false);
  }

  getList(){
    this.leaveService.listLeave().subscribe((result: any) => {
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
    // this.filteredData = this.leave.filter((item: { name:string; }) => item.name.includes(filter));
    this.filteredData = this.leave.filter((item: {  name:string;id: number; }) => {
      return item.name.toLowerCase().includes(filter) || item.id.toString().includes(filter);
    });
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


}
