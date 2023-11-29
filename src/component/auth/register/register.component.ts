import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/viewmodels/refgister.model';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent{
 override  user: Register = new Register;

  override register() {
   super.register();
  }
}
