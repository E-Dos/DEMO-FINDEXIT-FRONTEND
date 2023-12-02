import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  loading = false
  loadingMessage: string = `Авторизация...`;
  spinnerStatus: string = 'primary';
override user: { username: string; password: string } = { username: '', password: '' };

 override login() {
  this.loading = true
   super.login();
 }
}
