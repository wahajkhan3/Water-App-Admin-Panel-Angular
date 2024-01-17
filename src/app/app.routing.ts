import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth.component';
import { GuardGuard } from './auth/guard.guard';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: 'error',
    loadChildren: () =>
     import('./error/error.module').then(x => x.ErrorModule)
  },
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   canActivate: [GuardGuard],
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  //     }]
  // },
  {
    path: '',
    canActivate: [GuardGuard],
  
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
    },
  {
    path: '**',
    redirectTo: ''
  },
  {
    path: '',
    redirectTo: 'dashboard',
    canActivate:[GuardGuard]
  }

  // {
  //   path: '',
  //   canActivate: [GuardGuard],
  //   redirectTo: 'dashboard'
  // }
]
