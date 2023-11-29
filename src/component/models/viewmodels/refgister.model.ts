


import { Injectable } from "@angular/core";
import { BaseDictModel } from "../base.model";

@Injectable({
  providedIn: "root",
})
export class Register extends BaseDictModel  {

  constructor() {
    super();
    super.setControllerName("auth");
  }

  public id: number = 0
  public username: string = ""
  public fullname: string = ""
  public password: string = ""
  public confirmPassword: string = ""
  public email: string = ""
}
