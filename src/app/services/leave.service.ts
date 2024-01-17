import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http:HttpClient) { }
  // LEAVE TYPE STARTS
  addLeaveType(data:any){
    return this.http.post(`${baseUrl}admin/leave/type`,data);
  }
  listLeaveType(){
    return this.http.get(`${baseUrl}admin/leave/type`);
  }
  delLeaveType(id:number){
    return this.http.delete(`${baseUrl}admin/leave/type/${id}`);
  }
  getbyIdLeaveType(id:number){
    return this.http.get(`${baseUrl}admin/leave/type/${id}`);
  }
  updateLeaveType(id:number, data:any){
    return this.http.put(`${baseUrl}admin/leave/type/${id}`,data)
  }


  // TOTAL LEAVE STARTS
  // addLeave(data:any){
  //   return this.http.post(`${baseUrl}admin/leave/type`,data);
  // }
  listLeave(){
    return this.http.get(`${baseUrl}admin/users/leave`);
  }
  // delLeave(id:number){
  //   return this.http.delete(`${baseUrl}admin/leave/type/${id}`);
  // }
  getbyIdLeave(id:number){
    return this.http.get(`${baseUrl}admin/user/leave/${id}`);
  }
  updateLeave(id:number, data:any){
    return this.http.put(`${baseUrl}admin/user/leave/${id}`,data);
  }
 
  // LEAVE APPLIED BY USER STARTS
  listLeaveAppliedByUser(){
    return this.http.get(`${baseUrl}admin/applied/leave`);
  }
  updateLeaveAppliedByUserStatus(id:number,status:any){
    return this.http.put(`${baseUrl}admin/leave/approved/reject/${id}`,status);
  }

}
