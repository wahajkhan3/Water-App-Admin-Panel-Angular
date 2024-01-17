import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/users/user/user.component';

import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { leavesComponent } from '../../pages/leaves/leaves.component';
import { TableComponent } from '../../pages/table/table.component';

import { NgbDatepickerModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import {HttpClientModule} from '@angular/common/http'
import { table } from 'console';
import { userlistComponent } from 'app/pages/users/userlist/userlist.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LeaveTypeListComponent } from 'app/pages/leave/leavetype-list/leave-list.component';
import { LeaveTypesComponent } from 'app/pages/leave/leave-types-AddEdit/leave-types.component';
import { ScheduleListComponent } from 'app/pages/schedule/schedule-list/schedule-list.component';
import { ScheduleAddEditComponent } from 'app/pages/schedule/schedule-add-edit/schedule-add-edit.component';
import { TaskListComponent } from 'app/pages/task/task-list/task-list.component';
import { TaskAddEditComponent } from 'app/pages/task/task-add-edit/task-add-edit.component';
import { LeaveAddEditComponent } from 'app/pages/leave/leave-add-edit/leave-add-edit.component';
import { LeaveListComponent } from 'app/pages/leave/leave-list/leave-list.component';
import { AdminListComponent } from 'app/pages/admin/admin-list/admin-list.component';
import { AdminCreateComponent } from 'app/pages/admin/admin-createEdit/admin-create.component';
import { LeaveAppliedByUsersComponent } from 'app/pages/leave/leave-applied-by-users/leave-applied-by-users.component';
import { NotificationComponent } from 'app/pages/notification/notification.component';
import { CustomTimePipePipe } from 'app/pipes/custom-time-pipe.pipe';
import { UserViewComponent } from 'app/pages/users/user-view/user-view.component';
import { TaskViewComponent } from 'app/pages/task/task-view/task-view.component';
import { UserTimeDetailsComponent } from 'app/pages/users/user-time-details/user-time-details.component';
// import { UserEditComponent } from 'app/pages/user-edit/user-edit.component';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbCalendar, NgbAlertModule, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { UserSelectedDateDetailsComponent } from 'app/pages/users/user-selected-date-details/user-selected-date-details.component';
import { DesignationListComponent } from 'app/pages/designation/designation-list/designation-list.component';
import { DesignationAddEditComponent } from 'app/pages/designation/designation-add-edit/designation-add-edit.component';
import { AreaAddComponent } from 'app/pages/area/area-add/area-add.component';
import { AreaListComponent } from 'app/pages/area/area-list/area-list.component';
import { DeliveryBoyAddComponent } from 'app/pages/delivery-boy/delivery-boy-add/delivery-boy-add.component';
import { DeliveryBoyListComponent } from 'app/pages/delivery-boy/delivery-boy-list/delivery-boy-list.component';
import { CustomerAddComponent } from 'app/pages/customer/customer-add/customer-add.component';
import { CustomerListComponent } from 'app/pages/customer/customer-list/customer-list.component';
import { CustomerDetailsComponent } from 'app/pages/customer/customer-details/customer-details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    // HttpClientModule,

    ReactiveFormsModule,
    NgbAlertModule,
    FormsModule,
    NgbPaginationModule,
    JsonPipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: 'rgb(0, 189, 99)',
      switchColor: '#red',
      defaultBgColor: '#00ACFF',
      defaultBoColor: '#476EFF',
      checkedLabel: 'on',
      uncheckedLabel: 'off'
    })
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    leavesComponent,
    userlistComponent,
    LeaveTypeListComponent,
    LeaveTypesComponent,
    ScheduleListComponent,
    ScheduleAddEditComponent,
    TaskListComponent,
    TaskAddEditComponent,
    LeaveAddEditComponent,
    LeaveListComponent,
    AdminListComponent,
    AdminCreateComponent,
    LeaveAppliedByUsersComponent,
    NotificationComponent,
    CustomTimePipePipe,
    UserViewComponent,
    UserTimeDetailsComponent,
    TaskViewComponent,
    UserSelectedDateDetailsComponent,
    DesignationListComponent,
    DesignationAddEditComponent,
    AreaAddComponent,
    AreaListComponent,
    DeliveryBoyAddComponent,
    DeliveryBoyListComponent,
    CustomerAddComponent,
    CustomerListComponent,
    CustomerDetailsComponent
  ],
  exports: [
  ]
})

export class AdminLayoutModule { }
