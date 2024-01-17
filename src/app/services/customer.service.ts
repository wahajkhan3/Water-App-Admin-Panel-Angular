import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  addCustomer(data:any){
    return this.http.post(`${baseUrl}admin/create/customer`,data);
  }

  listCustomer(){
    return this.http.get(`${baseUrl}admin/list/customer`);
  }

  getCustomerDetailById(id:number){
    return this.http.get(`${baseUrl}admin/user/form/list/${id}`);
  }

}
