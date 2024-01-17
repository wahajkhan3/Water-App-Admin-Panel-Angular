import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  isAdminLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }


  adminLogin(data: any) {

    console.log(data);
    return this.http.post(`${baseUrl}admin/login`, data);
    // .subscribe((resp: any) => {

    //   if (resp) {
    //     this.isAdminLoggedIn.next(true);
    //     localStorage.setItem('token', resp.data.token);
    //     this.router.navigateByUrl('/dashboard')
    //   }
    //   else {
    //     alert('Login Failed!')
    //   }
    // })
  }
  
  public isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  
  public saveToken(access_token:string){
    localStorage.setItem('token', access_token) !== null;
  }

  public saveRefreshToken(refresh_token:string){
    localStorage.setItem('REFRESH_TOKEN', refresh_token) !== null;
  }

  public getToken(): string {
    let token = localStorage.getItem('token');
    return token as string;
  }

  public getRefreshToken(): string {
    let token = localStorage.getItem('REFRESH_TOKEN');
    return token as string;
  }


  public logout(){
    this.router.navigate(['']);
    localStorage.removeItem('token');
  }

}
