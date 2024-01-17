import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryboyService {

  constructor(private http:HttpClient) { }

  addDeliveryBoy(data:any){
    return this.http.post(`${baseUrl}admin/create/deliveryBoy`,data);
  }

  listDeliveryBoy(){
    return this.http.get(`${baseUrl}admin/list/deliveryBoy`);
  }

}
