import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http:HttpClient) { }

  getDesignation(){
    return this.http.get(`${baseUrl}admin/designation?perPage=${10000000}`);
  }
  addDesignation(data:any){
    return this.http.post(`${baseUrl}admin/designation`,data);
  }
  updateDesignation(id:number, data:any){
    return this.http.put(`${baseUrl}admin/designation/${id}`,data);
  }
  deleteDesignation(id:number){
    return this.http.delete(`${baseUrl}admin/designation/${id}`)
  }
  getbyIdDesignation(id:number){
    return this.http.get(`${baseUrl}admin/designation/${id}`)
  }
}
