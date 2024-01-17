import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthModule } from "./auth/auth.module";
import { CustomInterceptor } from "./auth/services/custom.interceptor";
import { ErrorModule } from "./error/error.module";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from "ngx-ui-switch";
// import { DesignationListComponent } from './pages/designation/designation-list/designation-list.component';
// import { DesignationAddEditComponent } from './pages/designation/designation-add-edit/designation-add-edit.component';
// import { UserEditComponent } from './pages/user-edit/user-edit.component';
// import { DataTablesModule } from 'angular-datatables';
// import 'datatables.net';
// import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
    
  ],
  imports: [
    BrowserAnimationsModule,
    AuthModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    AuthModule,
    NgbModule,
    NgbPaginationModule
    // DataTablesModule
    // DataTablesModule
    // NgSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
