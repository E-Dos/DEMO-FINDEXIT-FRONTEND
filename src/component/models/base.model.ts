
import { ApiService } from "../services/api.service";
import { AppSettings } from "./app-settings";
import { User } from './user.model';
/**
 * Базовый класс для обмена данными с сервером
 * Справочники наследуется с этого класса
 */
export abstract class BaseDictModel {
  constructor() {
  }
  protected controllerName!: string;
  public successMessage: string = "";
  public errorMessage: string = "";
  static loginKey: string = AppSettings.LoginKey;
  static roleKey: string = AppSettings.RoleKey;



  public static setCurrentUser(data: User) {
    BaseDictModel.setToLocalStorage(BaseDictModel.loginKey, data)
  }


  private static setToLocalStorage(itemName: string, data: any) {
    localStorage.setItem(itemName, JSON.stringify(data))
  }

  /**
   * метод для динамической создания класса - надо исправить
   * @param obj
   */
  public static to(obj: object): any {
    var classname = this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
    var instance = eval(`new ${classname}()`);
    return Object.assign(instance, obj);
  }

  /**
   * устанавливает название контроллера для подключение к апи
   * @param name - название контроллера в апи
   */
  protected setControllerName(name: string): void {
    this.controllerName = name;
  }

  public GetAll() {
    return ApiService.instance.GET(`${this.controllerName}`);
  }

  public GetById(Id: number) {
    return ApiService.instance.GET(`${this.controllerName}/${Id}`);
  }

  public DeleteItem(Id: number) {
    return ApiService.instance.DELETE(`${this.controllerName}/${Id}`);
  }

  public CreateItem(item: any) {
    return ApiService.instance.postRequest(`${this.controllerName}`, item);
  }
  public UpdateItem(item: any) {
    return ApiService.instance.putRequest(`${this.controllerName}`, item);
  }
}
