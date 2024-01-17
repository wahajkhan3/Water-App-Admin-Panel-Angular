import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';


@NgModule({
  declarations: [
    Error404Component,
    Error500Component,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    RouterModule
  ]
})
export class ErrorModule { }
