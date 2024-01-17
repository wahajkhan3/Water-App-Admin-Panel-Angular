import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }
  addArea(data:any){
    return this.http.post(`${baseUrl}admin/create/area`,data);
  }

  listArea(){
    return this.http.get(`${baseUrl}admin/list/area`);
  }
}
