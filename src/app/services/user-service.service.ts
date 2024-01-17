import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'environments/environment';
import { EditedUser } from 'app/models/editUser';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  userList(){
    return this.http.get(`${baseUrl}admin/users`);
  }
  SaveUserRegistration(data:any){
    return this.http.post(`${baseUrl}admin/user/signup`,data);
  }
  getUserById(id:number){
    return this.http.get(`${baseUrl}admin/user/details/${id}`);
  }
  editUser(id:number, data:EditedUser ): Observable<EditedUser>{
    return this.http.put<EditedUser>(`${baseUrl}admin/user/details/${id}`,data);
  }
  userDetails(id:number){
    return this.http.get(`${baseUrl}admin/user/details/${id}`);
  }
  updateJobStatus(id:number, data:any){
    return this.http.put(`${baseUrl}admin/employee/status/${id}`,data);
  }
  userChecksBreaksDetails(id:number){
    return this.http.get(`${baseUrl}admin/monthly/data/${id}`);
  }
  userSingleDateGet(id:number, selectedDate:any){
    return this.http.get(`${baseUrl}admin/dateWise/${id}?date=${selectedDate}`);
  }
  userDateFilter(id:number,dateFrom:any, dateEnd:any){
    return this.http.get(`${baseUrl}admin/monthly/data/${id}?dateFrom=${dateFrom}&dateTo=${dateEnd}`);
  }
}
