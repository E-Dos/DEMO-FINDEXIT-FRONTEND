import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { NbAclService } from "@nebular/security";
import { AppSettings } from "../models/app-settings";
import { User } from "../models/user.model";
import { UserRole } from "../models/user-role.model";
import { Register } from "../models/viewmodels/refgister.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  register(model: Register) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    public acl: NbAclService) {
  }

}
