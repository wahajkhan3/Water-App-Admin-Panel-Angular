import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(private http:HttpClient) { }

  applyLeave(data:any){
    return this.http.post(`${baseUrl}user/apply/leaves`,data);
  }
}
