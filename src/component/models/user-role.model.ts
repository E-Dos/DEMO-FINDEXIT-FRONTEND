import { Injectable } from "@angular/core";
import { UserPermission } from "./user-permission.model"
import { BaseDictModel } from "./base.model";

@Injectable({
  providedIn: "root",
})

export class UserRole extends BaseDictModel {

  constructor() {
    super();
    super.setControllerName("User");
  }

  public id: number = 0
  public name: string = "";
  public permissions: UserPermission[] = [];
  public AccessControl: any;
}
