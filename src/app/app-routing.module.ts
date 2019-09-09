import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService }  from './service/auth-guard.service';

import { LoginComponent } from './external/login/login.component';
import { VerifyComponent } from './external/verify/verify.component';
import { RegisterComponent } from './external/register/register.component';
import { PasswordForgotComponent } from './external/password-forgot/password-forgot.component';

import { PortalComponent } from './internal/portal/portal.component';

const routes: Routes = [{
  path: '**',
  redirectTo: '/login', 
  pathMatch: 'full'
  }, {  
    path: 'register',
    component: RegisterComponent 
  }, {  
    path: 'login',
    component: LoginComponent 
  }, {
    path: 'password-forgot',
    component: PasswordForgotComponent
  }, {
    path: 'verify',
    component: VerifyComponent
  }, {
    path: 'portal',
    canActivate: [AuthGuardService],
    component: PortalComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
