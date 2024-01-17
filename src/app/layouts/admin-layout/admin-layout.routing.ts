import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/users/user/user.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { TableComponent } from '../../pages/table/table.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { leavesComponent } from 'app/pages/leaves/leaves.component';
import { table } from 'console';
import { userlistComponent } from 'app/pages/users/userlist/userlist.component';
import { GuardGuard } from 'app/auth/guard.guard';
import { AdminLayoutComponent } from './admin-layout.component';
import { LeaveTypeListComponent } from 'app/pages/leave/leavetype-list/leave-list.component';
import { LeaveTypesComponent } from 'app/pages/leave/leave-types-AddEdit/leave-types.component';
import { ScheduleListComponent } from 'app/pages/schedule/schedule-list/schedule-list.component';
import { ScheduleAddEditComponent } from 'app/pages/schedule/schedule-add-edit/schedule-add-edit.component';
import { TaskListComponent } from 'app/pages/task/task-list/task-list.component';
import { TaskAddEditComponent } from 'app/pages/task/task-add-edit/task-add-edit.component';
import { LeaveListComponent } from 'app/pages/leave/leave-list/leave-list.component';
import { LeaveAddEditComponent } from 'app/pages/leave/leave-add-edit/leave-add-edit.component';
import { AdminListComponent } from 'app/pages/admin/admin-list/admin-list.component';
import { AdminCreateComponent } from 'app/pages/admin/admin-createEdit/admin-create.component';
import { LeaveAppliedByUsersComponent } from 'app/pages/leave/leave-applied-by-users/leave-applied-by-users.component';
import { NotificationComponent } from 'app/pages/notification/notification.component';
import { UserViewComponent } from 'app/pages/users/user-view/user-view.component';
import { TaskViewComponent } from 'app/pages/task/task-view/task-view.component';
import { UserTimeDetailsComponent } from 'app/pages/users/user-time-details/user-time-details.component';
import { UserSelectedDateDetailsComponent } from 'app/pages/users/user-selected-date-details/user-selected-date-details.component';
import { DesignationListComponent } from 'app/pages/designation/designation-list/designation-list.component';
import { DesignationAddEditComponent } from 'app/pages/designation/designation-add-edit/designation-add-edit.component';
import { CustomerListComponent } from 'app/pages/customer/customer-list/customer-list.component';
import { CustomerAddComponent } from 'app/pages/customer/customer-add/customer-add.component';
import { AreaListComponent } from 'app/pages/area/area-list/area-list.component';
import { AreaAddComponent } from 'app/pages/area/area-add/area-add.component';
import { DeliveryBoyListComponent } from 'app/pages/delivery-boy/delivery-boy-list/delivery-boy-list.component';
import { DeliveryBoyAddComponent } from 'app/pages/delivery-boy/delivery-boy-add/delivery-boy-add.component';
import { CustomerDetailsComponent } from 'app/pages/customer/customer-details/customer-details.component';
// import { UserEditComponent } from 'app/pages/user-edit/user-edit.component';

export const AdminLayoutRoutes: Routes = [

    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [GuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },


            { path: 'admin/admin-list', component: AdminListComponent },
            { path: 'admin/admin-create', component: AdminCreateComponent },
            { path: 'admin/admin-edit/:id', component: AdminCreateComponent },

            { path: 'customer/customer-list', component: CustomerListComponent },
            { path: 'customer/customer-add', component: CustomerAddComponent },
            { path: 'customer/customer-details/:id', component: CustomerDetailsComponent},
            
            { path: 'area/area-list', component: AreaListComponent },
            { path: 'area/area-add', component: AreaAddComponent},

            { path: 'deliveryboy/deliveryboy-list', component: DeliveryBoyListComponent },
            { path: 'deliveryboy/deliveryboy-add', component: DeliveryBoyAddComponent },



            { path: 'user', component: UserComponent },
            { path: 'edit-user/:id', component: UserComponent },
            { path: 'userlist', component: userlistComponent },
            { path: 'user/:id', component: UserViewComponent },
            { path: 'userTimeDetails/:id', component: UserTimeDetailsComponent },
            { path: 'user-selected-date/:id', component: UserSelectedDateDetailsComponent },
            // {path: 'leaves',component: leavesComponent},

            { path: 'designation-list', component: DesignationListComponent },
            { path: 'designation-add', component: DesignationAddEditComponent },
            { path: 'designation-edit/:id', component: DesignationAddEditComponent },

            { path: 'leave/leavetype-list', component: LeaveTypeListComponent },
            { path: 'leave/leavetype-add', component: LeaveTypesComponent },
            { path: 'leave/leavetype-edit/:id', component: LeaveTypesComponent },
            { path: 'leave/leaveappliedbyuser', component: LeaveAppliedByUsersComponent },

            { path: 'leave/leaves-list', component: LeaveListComponent },
            { path: 'leave/leaves-add', component: LeaveAddEditComponent },
            { path: 'leave/leaves-edit/:id', component: LeaveAddEditComponent },

            { path: 'schedule/schedule-list', component: ScheduleListComponent },
            { path: 'schedule/schedule-add', component: ScheduleAddEditComponent },
            { path: 'schedule/schedule-edit/:id', component: ScheduleAddEditComponent },

            { path: 'task/task-list', component: TaskListComponent },
            { path: 'task/task-add', component: TaskAddEditComponent },
            { path: 'task/task-edit/:id', component: TaskAddEditComponent },
            { path: 'task/task-details/:id', component: TaskViewComponent },

            { path: 'notification/notification-send', component: NotificationComponent },

            { path: 'notifications', component: NotificationsComponent },

            { path: 'table', component: TableComponent },

            { path: 'typography', component: TypographyComponent },

            { path: 'icons', component: IconsComponent },

            { path: 'maps', component: MapsComponent },

            { path: 'upgrade', component: UpgradeComponent },
            // {
            //     path:'/login', redirectTo:'/dashboard', pathMatch:'full'
            // },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [GuardGuard] },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [GuardGuard] }
        ]
    }];