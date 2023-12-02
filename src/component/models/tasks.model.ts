import { Injectable } from "@angular/core";
import { BaseDictModel } from "./base.model";
import { ApiService } from "../services/api.service";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class Tasks extends BaseDictModel {
  public Id: number = 0;
  public Name: string = "";
  public Description: string = "";
  public StartDate: Date = new Date();
  public EndDate: Date = new Date();
  public UserId!: number;
  public User!: User;
  public CompletionPercent: number = 0;
  public DayOfOverdue: number = 0

  constructor() {
    super();
    this.setControllerName("tasks");
  }

  public GetOverdueTask() {
    return ApiService.instance.GET(`${this.controllerName}/overdueTasks`);
  }
}
