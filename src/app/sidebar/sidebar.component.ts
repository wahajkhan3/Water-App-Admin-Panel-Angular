import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
  // {
  //   path: '/admin/admin-list', title: 'Admin', icon: 'nc-single-02', class: '', children: [
  //     { path: '/admin/admin-create', title: 'Add ', icon: 'nc-single-02', class: '' },
  //     { path: '/admin/admin-list', title: 'List', icon: 'nc-tile-56', class: '' },
  //   ]
  // },

  {
    path: '/customer/customer-list', title: 'Customer', icon: 'nc-single-02', class: '', children: [
      { path: '/customer/customer-add', title: 'Add', icon: 'nc-single-02', class: '' },
      { path: '/customer/customer-list', title: 'List', icon: 'nc-tile-56', class: '' },
    ]
  },

  {
    path: '/area/area-list', title: 'Area', icon: 'nc-single-02', class: '', children: [
      { path: '/area/area-add', title: 'Add ', icon: 'nc-single-02', class: '' },
      { path: '/area/area-list', title: 'List', icon: 'nc-tile-56', class: '' },
    ]
  },

  {
    path: '/deliveryboy/deliveryboy-list', title: 'Delivery Boy', icon: 'nc-single-02', class: '', children: [
      { path: '/deliveryboy/deliveryboy-add', title: 'Add', icon: 'nc-single-02', class: '' },
      { path: '/deliveryboy/deliveryboy-list', title: 'List', icon: 'nc-tile-56', class: '' },
    ]
  },



  
  // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  // {
  //   path: '/userlist', title: 'User', icon: 'nc-single-02', class: '', children: [
  //     { path: '/user', title: 'Add User', icon: 'nc-single-02', class: '' },
  //     { path: '/userlist', title: 'Users List', icon: 'nc-tile-56', class: '' },
  //   ]
  // },
  // {
  //   path: '/designation-list', title: 'Designation', icon: 'nc-single-02', class: '', children: [
  //     { path: '/designation-add', title: 'Add Desig', icon: 'nc-tile-56', class: '' },
  //     { path: '/designation-list', title: 'Desig List', icon: 'nc-single-02', class: '' },
  //   ]
  // },
  
  // {
  //   path: '/leave/leavetype-list', title: 'Leave', icon: 'nc-single-02', class: '', children: [
  //     { path: '/leave/leavetype-list', title: 'Leave Type', icon: 'nc-tile-56', class: '' },
  //     { path: '/leave/leaves-list', title: 'User Leave', icon: 'nc-tile-56', class: '' },
  //     { path: '/leave/leaveappliedbyuser', title: 'Applied Leaves', icon: 'nc-tile-56', class: ''},
  //     // { path: '/leave/leavetype-add', title: 'Leave Add', icon: 'nc-tile-56', class: '' },
  //   ]
  // },

  // {
  //   path: '/schedule/schedule-list', title: 'Schedule', icon: 'nc-single-02', class: '', children: [
  //     { path: '/schedule/schedule-add', title: 'Add Schedule',  icon: 'nc-single-02', class: '' },
  //     { path: '/schedule/schedule-list', title: 'Schedule List',icon: 'nc-tile-56', class: '' },
  //   ]
  // },

  // {
  //   path: '/task/task-list', title: 'Task', icon: 'nc-single-02', class: '', children: [
  //     { path: '/task/task-add', title: 'Add Task', icon: 'nc-single-02', class: '' },
  //     { path: '/task/task-list', title: 'Task List', icon: 'nc-tile-56', class: '' },
  //   ]
  // },
  // { path: '/notification/notification-send', title: 'Notification', icon: 'nc-bank', class: ''}
  // { path: '/user',          title: 'User Registration',      icon:'nc-single-02',  class: '' },
  // { path: '/table',         title: 'Table',        icon:'nc-tile-56',    class: '' },

  // { path: '/userlist',         title: 'Users List',        icon:'nc-tile-56',    class: '' },

  // { path: '/leaves', title: 'Leave', icon: 'nc-watch-time', class: '' }
  // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
