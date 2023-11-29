import { Component } from '@angular/core';
import { NbAuthService, NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
 // Добавьте свои свойства, например, поля для ввода
override user: { username: string; password: string } = { username: '', password: '' };

 override login() {
   super.login();
 }

}
