import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { logedUserGuard } from '../guards/loged-user.guard';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
