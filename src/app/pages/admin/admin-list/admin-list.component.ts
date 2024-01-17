import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  admin: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading:boolean=true;
  
  pageSizes: any = [5, 10, 15, 20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;
  base:any=`https://timemanagment.codeaugment.com/`;
  showImageModal: boolean = false;
  currentImage: string = '';
  isActive: string = 'All';
  // allStatus:[any]=[this.admin.status];
  constructor(private adminService:AdminService, private toastr:ToastrService) { }
  ngOnInit(): void {
    this.getList();
    this.onPageInputChange();
    
  }
  getList(){
    this.adminService.getAdminList().subscribe((result: any) => {
      console.log(result);
      this.admin = result.data;
      this.filterData();
      this.isLoading = false;
      
   } );
  }

  onTableSizeChange(event: any){
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.getList();
  }
  filterUser(status:string){
    if (status === 'All') {
      this.filteredData = this.admin; // Show all data
      this.isActive='All';
    } else {
      this.filteredData = this.admin.filter((item) => item.status === status);
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
  
  // showAll(status) {
  //   this.isActive = this.admin.filter(item => item.status == status); // Set a new status for "All"
  // }
  filterData() {
    const filter = this.searchText.toLowerCase();
    // const filterNum= this.searchNumber.search();
    this.filteredData = this.admin.filter((item: { name:string, email:string }) => {
      return item.name.toLowerCase().includes(filter) || item.email.toLowerCase().includes(filter)});
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
  // groupDel(id:number){
  //   this.scheduleService.delScheduleList(id).subscribe((resp)=>{
  //     console.log('Service Deleted',resp);
  //     this.showNotification('top', 'right');
  //     this.ngOnInit();
  //   })

  // }
  openImageModal(imageUrl: string) {
    this.currentImage = imageUrl;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.currentImage = '';
  }
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
