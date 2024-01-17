import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  task: any = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  pageSizes: any = [5, 10, 15, 20];
  pageSize: number = 5;
  pageIndex: any = 1;
  currentPage: any = 1;

  isConfirmationVisible: boolean = false;
  isActive: string = 'All';
  selectedTaskId: any;
  
  constructor(private taskService: TaskService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.onPageInputChange();
    this.getlist();
  }
  getlist() {
    this.taskService.getTaskList().subscribe((result: any) => {
      console.log(result);
      this.task = result.data.data;
      this.filterData();
      this.isLoading = false;

    });
  }

  onTableSizeChange(event :any): void{
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.getlist();
  }

  filterUser(status: string) {
    if (status === 'All') {
      this.filteredData = this.task; // Show all data
      this.isActive = 'All';
    } else {
      this.filteredData = this.task.filter((item) => item.status === status);
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
  onChangeStatus(event: Event, data: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    const requestBody = {
      status: selectedValue,
    };
    this.taskService.updateTaskStatus(data.taskId, requestBody).subscribe(
      (resp) => {

        this.showNotification('top', 'right');
        console.log('Status Changed', resp);

        data.status = selectedValue;
        this.getlist();

      }
    );
  }

  filterData() {
    const filter = this.searchText.toLowerCase();
    // const filterNum= this.searchNumber.search();
    this.filteredData = this.task.filter((item: { name: string; title: string }) => {
      return item.name.toLowerCase().includes(filter) || item.title.toLowerCase().includes(filter)
    });
    // this.filteredData = this.users.filter((item) => item.email.toLowerCase().includes(filter));
    // this.filteredData = this.users.filter((item) => item.id.includes(filter));

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
  taskPass(id:number){
    this.selectedTaskId = id;
  }
  taskDel(id: number) {
    this.selectedTaskId = id;
    this.taskService.delTask(id).subscribe((resp) => {
      console.log('Task Deleted', resp);
      this.showNotification('top', 'right');
      this.ngOnInit();
    })

  }
  confirmDeletion() {
    // Logic for deletion confirmation goes here
    // For example, you can add console log or an alert to test the function
    console.log('Item deletion confirmed!');
    // Or perform deletion logic here if required
  }
  // openDeleteConfirmation() {
  // // this.selectedTaskId= this.task.taskId;
  //   this.isConfirmationVisible = true;
  // }

  // confirmDelete(id:any) {
  //   this.taskService.delTask(id).subscribe((resp)=>{
  //     console.log('Task Deleted',resp);
  //     this.showNotification('top','right');
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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Changes has been <b>Saved Successfully</b> - in Task List</span>',
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
