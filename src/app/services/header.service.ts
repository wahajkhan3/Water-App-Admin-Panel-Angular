import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  customer = new Subject<boolean>();
  deliveryBoy = new Subject<boolean>();
  area = new Subject<boolean>();
  adminsign = new Subject<boolean>();
  userSign = new Subject<boolean>();
  leave = new Subject<boolean>();
  schedule = new Subject<boolean>();
  task = new Subject<boolean>();
  designation = new Subject<boolean>();
  dashboard = new Subject<boolean>();
  
  constructor() { }
}
