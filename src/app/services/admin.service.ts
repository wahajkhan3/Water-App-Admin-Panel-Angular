import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAdminList(){
    return this.http.get(`${baseUrl}admin/admin`);
  }
  addAdmin(data:any){
    return this.http.post(`${baseUrl}admin/register`,data);
  }
  // getByIdAdmin(id:number){
  //   return this.http.get(`${baseUrl}admin/admin/${id}`);
  // }
  // updateAdmin(id:number, data:any){
  //   return this.http.put(`${baseUrl}admin/admin/${id}`,data);
  // }
  // getDesignation(){
  //   return this.http.get(`${baseUrl}admin/designation`);
  // }

}

