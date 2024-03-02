import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { logedUserGuard } from '../guards/loged-user.guard';
import { authGuard } from '../guards/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [logedUserGuard],
    title: 'FreshCart | Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [logedUserGuard],
    title: 'FreshCart | Register',
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    canActivate: [logedUserGuard],
    title: 'FreshCart | Forget Password',
  },
  {
    path: 'verifyCode',
    component: VerifyCodeComponent,
    canActivate: [logedUserGuard],
    title: 'FreshCart | Verify Code',
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [logedUserGuard],
    title: 'FreshCart | Reset Password',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
