import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getDashboardWidgets(){
    return this.http.get(`${baseUrl}admin/dashboard`);
  }

  getDashboardData(){
    return this.http.get(`${baseUrl}admin/dashboard`);
  }


}
