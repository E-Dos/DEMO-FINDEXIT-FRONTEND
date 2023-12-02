import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbLogoutComponent} from '@nebular/auth';
import { LoginComponent } from 'src/component/auth/login/login.component';
import { EmployeeListComponent } from '../employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: NbLogoutComponent,
  },
  {
    path: 'employee',
    component: EmployeeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

