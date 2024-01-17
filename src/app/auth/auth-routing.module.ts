import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guard.guard';

const routes: Routes = [
  {
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    
   ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
