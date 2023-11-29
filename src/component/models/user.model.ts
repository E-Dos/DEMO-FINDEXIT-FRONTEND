

import { UserRole } from "./user-role.model";

import { Injectable } from "@angular/core";
import { BaseDictModel } from "./base.model";

@Injectable({
  providedIn: "root",
})
export class User extends BaseDictModel  {

  constructor() {
    super();
    super.setControllerName("User");
  }

  public id: number = 0
  public name: string = ""
  public password: string = ""
  public access_token: string = ""
  public role: UserRole = new UserRole()
}
