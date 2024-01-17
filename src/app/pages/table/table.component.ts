import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { users } from 'app/models/usersList';
import { UserServiceService } from 'app/services/user-service.service';

declare interface TableData {
    users: any[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    usersList: any[] = [];
    filteredData: any[] = [];
  searchText: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
    constructor(private userService: UserServiceService, private cdr: ChangeDetectorRef) { }
    // public tableData1: TableData;
    // public tableData2: TableData;

    // users:any = [
    //     { id: 1, name: 'John', email: 'john@example.com',  contactNo: '12345678901', age: 30, address: '123 Street, City' },
    // Add more user data as needed
    //   ];
    // ngOnInit(){
    //     // this.tableData1 = {
    //         dataRows: [
    //             ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
    //             ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
    //             ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
    //             ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
    //             ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
    //             ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
    //         ]
    //     };
    //     // this.tableData2 = {
    //     //     headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
    //     //     dataRows: [
    //     //         ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
    //     //         ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
    //     //         ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
    //     //         ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
    //     //         ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
    //     //         ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
    //     //     ]
    //     // };
    // }
    // searchText: any = '';

    // get filteredUsers() {
    //   return this.tableData1.dataRows.filter((dataRows: { Name: string; }) => dataRows.Name.toLowerCase().includes(this.searchText.toLowerCase()));
    // }
    // }
    ngOnInit(): void {
        this.userService.userList().subscribe((result: any) => {
            console.log(result);
            this.usersList = result.data.data;
            this.filterData()
        })
    }
    filterData() {
        const filter = this.searchText.toLowerCase();
        this.filteredData = this.usersList.filter(
          (item) => item.name.toLowerCase().includes(filter)
        );
        this.currentPage = 1;
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
    // onSearch() {
    //     if (this.searchText.length > 3 || this.searchText.length == 0) {
    //         this.usersList = [];
    //         this.userService.userList();
    //     }
    // }

    // getQrPatients() {
    //     this.isLoading = true;
    //     this.qrCodeService.getQrPatientsList(this.searchText, this.pageIndex).subscribe((resp: any) => {
    //         this.isLoading = false;
    //         this.qrPatientList = resp.data.data;
    //         debugger
    //         this.length = resp.data.total;
    //         this.pageSize = resp.data.per_page;
    //         this.cdr.detectChanges();
    //         console.log(resp);
    //     });
    // }
    // changePage(currentPage: any) {
    //     this.pageIndex = currentPage;
    //     this.usersList = [];
    //     this.userService.userList();
    // }


}
