import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${localToken}` }});
    
    // return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if it's an unauthorized error (401 or 403 status code)
        if (error.status === 401 || error.status === 403) {
          // Clear token from local storage
          localStorage.removeItem('token');
          this.router.navigateByUrl('');
          this.toastr.success('Session Expired! You can login again')
          
        }
        return throwError(error);
      })
    );

  }
}
