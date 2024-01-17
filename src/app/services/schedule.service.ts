import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }

  getScheduleList(){
    return this.http.get(`${baseUrl}admin/time/schedule`);
  }
  postScheduleForm(data:any){
    return this.http.post(`${baseUrl}admin/time/schedule`,data);
  }
  getbyIdSchedule(id:number){
    return this.http.get(`${baseUrl}admin/time/schedule/${id}`);
  }
  updateScheduleForm(id:number, data:any){
    return this.http.put(`${baseUrl}admin/time/schedule/${id}`,data);
  }
  delScheduleList(id:number){
    return this.http.delete(`${baseUrl}admin/time/schedule/${id}`);
  }
}
