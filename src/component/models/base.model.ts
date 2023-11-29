import { ApiService } from "../services/api.service";
import { ApiResponse } from "./api-response";
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


  public static getCurrentUser() {
    var res = localStorage.getItem(this.loginKey) ?? '';
    return JSON.parse(res)
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

  /**
   * загрузка страницы с пагинацией
   * @param page  - номер страницы, начинается с 1
   */
  public loadPage(page = 0, uid = 0) {
    if (page <= 0) page = 1;
    var params = {
      pageNumber: page,
      pageSize: AppSettings.PAGE_SIZE,
      uid: uid
    };
    return this.getItemsByPage(params);
  }
  /**
    * загрузка  страницы с пагинацией
    * @param page  - номер страницы, начинается с 1
    * @param examResultId  - ИД Результата экзамена
    */
  public loadPageDetailResult(page = 0, examResultId: number) {
    if (page <= 0) page = 1;

    var params = {
      pageNumber: page,
      pageSize: AppSettings.PAGE_SIZE,
      erId: examResultId
    };

    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/List`, params);
  }

  public getAll() {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/All`, null);
  }

  public updateUserItem(param: object): any {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/UpdateUser`, param);
  }

  /**
   * удаление записи по ид
   * достаточно передать поле Id
   * @param item - экземпляр класса
   */
  public deleteItem(item: any) {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/Delete`, item);
  }

  public DELETE(Id: number) {
    return ApiService.instance.DELETE(`${this.controllerName}`, Id);
  }

  public GET(actionName: string) {
    return ApiService.instance.GET(`${this.controllerName}/${actionName}`);
  }

  public GETALL() {
    return ApiService.instance.GET(`${this.controllerName}/All`);
  }

  public GETByParams(actionName: string, params?: any) {
    return ApiService.instance.GET(`${this.controllerName}/${actionName}`, params);
  }

  /**
   * создаем нового объекта по параметрам
   * для репозиторий модели
   * @param item
   */
  protected saveNewWithParams(item: any) {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/Create`, item);
  }

  /**
   * сохраняем текущего объекта
   */
  public saveNew() {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/Create`, this);
  }

  /**
   * сохраняем объект по параметрам
   * для репозиторий модели
   * @param item
   */

  public updateItem(item: any) {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/Update`, item);
  }

  public updateFormData(item: FormData) {
    return ApiService.instance.postFormDataRequest<ApiResponse>(`${this.controllerName}/Update`, item);
  }
  public ImportFormData(actionName: string, item: FormData) {
    return ApiService.instance.postFormDataRequest<ApiResponse>(`${this.controllerName}/${actionName}`, item);
  }
  /**
    * Загрузка всех коллекции по параметрам: $Controller/All(@param)
    * @param param  - параметр объект
    */
  public getAllByParam(param: object) {
    return ApiService.instance.postByToken(`${this.controllerName}/All`, param);
  }
  /**
   * загрузка с базы модели по уникальному номеру ид
   * @param Id  - идентификатор записи
   */
  public getById(Id: number) {
    return this.getByParams({
      Id: Id,
    });
  }

  /**
   * загрузка с базы модели по параметрам
   * $Controller/Get(param)
   * @param param - объект параметр
   */
  public getByParams(param: object) {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/Get`, param);
  }

  /**
   * Отправляет запрос по указанному экшену текущего контроллера
   * @param actionName Имя экшена который отправляем запрос
   * @param param параметры
   */
  public getActionResult(actionName: string, param?: any) {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/${actionName}`, param);
  }
  /**
   * Отправляет запрос по указанному экшену текущего контроллера
   * @param actionName Имя экшена который отправляем запрос
   * @param param параметры
   */
  public getActionResultUnAuth(actionName: string, param?: object) {
    return ApiService.instance.questPostRequest<ApiResponse>(`${this.controllerName}/${actionName}`, param);
  }
  /**
    * Отправляет запрос по указанному экшену текущего контроллера
    * @param actionName Имя экшена который отправляем запрос
    * @param param параметры
    */
  public getActionResultByToken(actionName: string, param?: object) {
    return ApiService.instance.postByToken(`${this.controllerName}/${actionName}`, param);
  }

  public getFileResult(actionName: string, param?: object) {
    return ApiService.instance.postFileRequest<Blob>(`${this.controllerName}/${actionName}`, param);
  }

  /**
   * пока не реализовано...
   * @param pageNumber
   * @param pageSize
   */
  /**
   * Пагинация
   * ControllerName/List
   */
  protected getItemsByPage(param: object) {
    return ApiService.instance.postRequest<ApiResponse>(`${this.controllerName}/List`, param);
  }
}
