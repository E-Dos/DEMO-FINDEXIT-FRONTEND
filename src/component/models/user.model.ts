

import { Injectable } from "@angular/core";
import { BaseDictModel } from "./base.model";
import { Tasks } from "./tasks.model";

@Injectable({
  providedIn: "root",
})
export class User extends BaseDictModel {

  constructor() {
    super();
    super.setControllerName("users");
  }

  public Id: number = 0
  public Username: string = ""
  public Password: string = ""
  public FIO: string = ""
  public Position: string = ""
  public Tasks: Tasks[] = [];
  public access_token: string = ""
}
