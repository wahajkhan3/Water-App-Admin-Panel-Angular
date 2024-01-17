import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
// import { CustomInterceptor } from './services/custom.interceptor';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AuthRoutingModule
  ],
  exports: [
    LoginComponent,
    AuthComponent,
    RouterModule
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,
  //   multi: true
  // }
  // ],
})
export class AuthModule { }
