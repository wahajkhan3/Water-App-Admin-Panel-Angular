import { Component, OnInit } from '@angular/core';
import { DesignationService } from 'app/services/designation.service';
import { HeaderService } from 'app/services/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss']
})
export class DesignationListComponent implements OnInit {
  designation: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  pageSizes: any = [5,10,15,20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;
  isActive:string='';
  selectedLeaveId: number;
  constructor(private designationService:DesignationService, private toastr:ToastrService, private headerService:HeaderService) { }

  ngOnInit(): void {
    this.getList();
    this.onPageInputChange();

    // this.headerService.designation.next(true);
  }
  ngOnDestroy(): void {
    // this.headerService.designation.next(false);
  }

  getList(){
    this.designationService.getDesignation().subscribe((result: any) => {
      console.log(result);
      this.designation = result.data.data;
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
    // this.filteredData = this.designation.filter((item: { name:string; }) => item.name.includes(filter));
    this.filteredData = this.designation.filter((item: {  designation:string;id: number; }) => {
      return item.designation.toLowerCase().includes(filter) || item.id.toString().includes(filter);
    });
    // this.filteredData = this.designation.filter((item: { created_at:string; }) => item.created_at.includes(this.searchText.toLowerCase()));
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
  delPassId(id:number){
    this.selectedLeaveId = id;
  }
  delDesignation(id: number) {
    this.selectedLeaveId= id;
    this.designationService.deleteDesignation(id).subscribe((resp) => {
      console.log('Service Deleted', resp);
      this.showNotification('top', 'right');
      this.ngOnInit();
    })

  }

  showNotification(from, align) {

    // const id = this.route.snapshot.params['id'];



    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Desingation has been <b>Deleted Successfully</b></span>',
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
