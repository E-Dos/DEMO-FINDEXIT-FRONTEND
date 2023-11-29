import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AppSettings } from "../models/app-settings";
import { Router } from '@angular/router';
import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { User } from "../models/user.model";
import * as qs from "qs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

const httpFormDataOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  })
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  static instance: ApiService;
  constructor(private http: HttpClient, private router: Router) {
    ApiService.instance = this;
  }

  baseUrl: string = AppSettings.API_URL;
  loginKey: string = AppSettings.LoginKey;
  roleKey: string = AppSettings.RoleKey;
  //tempFilesUrl: string = AppSettings.FileUrl;

  public getCurrentUser(): User {
    const user = JSON.parse(localStorage.getItem(this.loginKey) ?? "");
    return user as User;
  };
  /**
    * Отправка запроса с токеном, application/json
    * @param url
    * @param obj
    */
  postByToken(url:string, obj:any): Observable<ApiResponse> {
    const currentUser = this.getCurrentUser(); //JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser.access_token;
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<ApiResponse>(
      this.baseUrl + url,
      JSON.stringify(obj),
      options
    ).pipe(
      tap(
        error => {
          if (error.status == 401) {
            localStorage.removeItem(this.loginKey)
            window.location.href = '/login'
          }
        }
      )
    );
  }
  get(url: string, params = null): Observable<ApiResponse> {
    var queryStr =
      params != null
        ? "?" +
        Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : "";
    return this.http.get<ApiResponse>(
      this.baseUrl + url + "/" + queryStr,
      httpOptions
    );
  }

  GET(url: string, params?: any): Observable<any> {
    const currentUser = this.getCurrentUser();
    const token = currentUser.access_token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      }),
      params: params
    };
    return this.http.get(this.baseUrl + url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || (error.headers && error.headers.get('invalidtoken'))) {
      window.location.href = '/login'
    }
    return throwError(() => error);
  }
  DELETE(url: string, Id: number): Observable<any> {
    const currentUser = this.getCurrentUser(); //JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser.access_token;
    url = `${this.baseUrl}${Id}`; // Замените 'endpoint' на ваш конкретный путь
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      }),
    };
    return this.http.delete(url, httpOptions);
  }

  post(url: string, obj = null): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl + url,
      JSON.stringify(obj),
      httpOptions
    );
  }
  /**
   * Отправляет application/x-www-form-urlencoded запрос без токена
   * @param url - адрес
   * @param obj - параметр
   */
  async postFormData<T>(url: string, obj = {}): Promise<T> {
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: qs.stringify(obj)
      });
      return (axiosResponse.data);
    } catch (error) {
      return (Promise.reject(error));
    }
  }

  async postFormDataRequest<T>(url: string, obj: FormData): Promise<T> {
    const currentUser = this.getCurrentUser(); //JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser.access_token;
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { Authorization: `Bearer ${token}` }
    });
    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: obj
      });
      if (axiosResponse.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (axiosResponse.data);

    } catch (error: any) {
      if (error.response.status == 401) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }

      if (error.headers && error.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (Promise.reject(error));
    }
  }
  async postFilesRequest<T>(url: string, obj: FormData): Promise<T> {
    const currentUser = this.getCurrentUser(); //JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser.access_token;
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { Authorization: `Bearer ${token}` }
    });
    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: obj
      });
      if (axiosResponse.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (axiosResponse.data);

    } catch (error: any) {
      if (error.response.status == 401) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }

      if (error.headers && error.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (Promise.reject(error));
    }
  }
  /**
     * Отправка запроса с токеном, application/json
     * @param url
     * @param obj
     */
  async questPostRequest<T>(url: string, obj: any): Promise<T> {
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: JSON.stringify(obj)
      });
      return (axiosResponse.data);
    } catch (error: any) {
      return (Promise.reject(error));
    }
  }
  /**
   * Отправка запроса с токеном, application/json
   * @param url
   * @param obj
   */
  async postRequest<T>(url: string, obj:any | null): Promise<T> {
    const currentUser = this.getCurrentUser(); //JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser.access_token;
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` }
    });

    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: JSON.stringify(obj)
      });
      if (axiosResponse.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (axiosResponse.data);

    } catch (error: any) {
      if (error.response.status == 401) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }

      if (error.headers && error.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (Promise.reject(error));
    }
  }

  /**
   * Отправка запроса , application/json
   * @param url
   * @param obj
   */
  async postAuthRequest<T>(url: string, obj:any): Promise<T> {

    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json' }
    });
    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: JSON.stringify(obj)
      });
      return (axiosResponse.data);

    } catch (error: any) {
      if (error.response.status == 401) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      if (error.headers && error.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (Promise.reject(error));
    }
  }
  async postFileRequest<T>(url: string, obj :any): Promise<T> {
    const currentUser = this.getCurrentUser(); //JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser.access_token;
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
    try {
      var axiosResponse = await instance.request<T>({
        method: 'post',
        url: url,
        data: JSON.stringify(obj),
        responseType: 'blob'
      });

      if (axiosResponse.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (axiosResponse.data);
    } catch (error: any) {
      if (error.response.status == 401) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }

      if (error.headers && error.headers['invalidtoken']) {
        localStorage.removeItem(this.loginKey)
        window.location.href = '/login'
      }
      return (Promise.reject(error));
    }
  }
}
