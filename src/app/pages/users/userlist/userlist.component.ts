import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';


declare interface TableData {
  // users:any[];
  // dataRows: string[][];
}

@Component({
  selector: 'userlist-cmp',
  moduleId: module.id,
  templateUrl: 'userlist.component.html',
  styleUrls: ['userlist.component.scss'],
})

export class userlistComponent implements OnInit {
  isLoading: boolean = true;
  isActive: string = 'All';

  showImageModal: boolean = false;
  currentImage: string = '';
  constructor(private userService: UserServiceService, private toastr: ToastrService) {
    // this.filteredData=this.visibleData;
  }

  base: string = "https://timemanagment.codeaugment.com/";

  // public tableData1: TableData;
  // public tableData2: TableData;
  // users:any = [
  //     { id: 1, name: 'John', email: 'john@example.com',  contactNo: '12345678901', age: 30, address: '123 Street, City' },
  //     // Add more user data as needed
  //   ];
  users: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  pageSizes: any = [5,10,15,20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;

  ngOnInit() {

    this.getList();
    this.onPageInputChange();
  }
  getList(){
    this.userService.userList().subscribe((result: any) => {
      console.log(result);
      this.users = result.data;
      this.filterData();
      this.isLoading = false;
    });
  }
  onTableSizeChange(event :any): void{
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.getList();
  }

  onChangeStatus(event: Event, data: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    const requestBody = {
      isEmployee: selectedValue,
    };
    this.userService.updateJobStatus(data.id, requestBody).subscribe(
      (resp) => {

        this.showNotification('top', 'right');
        console.log('Job Status Changed', resp);

        data.isEmployee = selectedValue;
      }
    );
  }
  // filterUsers(status: string) {
  //   this.isActive = status;
  // }
  filterData() {
    const filter = this.searchText.toLowerCase();
    // const filterNum= this.searchNumber.search();
    this.filteredData = this.users.filter((item: { name: string, email: string }) => {
      return item.name.toLowerCase().includes(filter) || item.email.toLowerCase().includes(filter)
    });
    // this.filteredData = this.users.filter((item) => item.email.toLowerCase().includes(filter));
    // this.filteredData = this.users.filter((item) => item.id.includes(filter));
    // this.filteredData = this.users.filter((item) => item.role.toLowerCase().includes(filter));
    // this.filteredData = this.users.filter((item) => item.cnic.toLowerCase().includes(filter))
    this.currentPage = 1; // Reset pageIndex when filtering
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
      this.filteredData = this.users; // Show all data
      this.isActive = 'All';
    } else {
      this.filteredData = this.users.filter((item) => item.status === status);
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

  // You c
  // changePage(currentPage: any) {


  //     this.pageIndex = currentPage;
  // this.users = [];
  // this.userService.userList();
  // if (this.currentPage > 1) {
  //   this.currentPage--;
  // }


  // if (this.currentPage < this.totalPages) {
  //   this.currentPage++;
  // }

  // }
  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
  get visibleData() {
    // const startIndex = (this.currentPage - 1) * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // return this.filteredData.slice(startIndex, endIndex);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }
  onPageInputChange() {
    // working
    // Handle the input change event
    // Ensure currentPage is within the valid range
    //   const totalPages = this.totalPages;
    //   if (this.currentPage < 1) {
    //     this.currentPage = 1;
    //   } else if (this.currentPage > totalPages) {
    //     this.currentPage = totalPages;
    //   }
    // }


    const totalPages = this.totalPages;

    // Parse the input value as an integer
    const newPage = parseInt(String(this.currentPage), 10);

    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      this.currentPage = newPage;
      // } else {
      //   // If the input is not a valid number or out of range, reset it to the previous value
      //   // You can also display a message to inform the user of the issue
      //   this.currentPage = 1; // Reset to 1 as an example; you can choose another default value
    }


    // get filteredUsers() {
    //   return this.users.filter((user: { Name: string; }) => user.Name.toLowerCase().includes(this.searchText.toLowerCase()));
    // }
  }
  showNotification(from, align) {

    // const id = this.route.snapshot.params['id'];
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Changes has been <b>Saved Successfully</b> - in User List</span>',
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