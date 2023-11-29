import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbLogoutComponent,  NbRequestPasswordComponent,  NbResetPasswordComponent,} from '@nebular/auth';
import { LoginComponent } from 'src/component/auth/login/login.component';
import { RegisterComponent } from 'src/component/auth/register/register.component';


const routes: Routes = [
  {

    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'logout',
    component: NbLogoutComponent,
  },
  {
    path: 'request-password',
    component: NbRequestPasswordComponent,
  },
  {
    path: 'reset-password',
    component: NbResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

