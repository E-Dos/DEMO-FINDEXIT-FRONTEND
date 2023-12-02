import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, switchMap, tap, throwError } from "rxjs";
import { AppSettings } from "../models/app-settings";
import { Router } from '@angular/router';
import axios from "axios";
import { User } from "../models/user.model";
import { NbAuthService, NbAuthToken } from "@nebular/auth";

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
  constructor(private http: HttpClient,
    private authService: NbAuthService) {
    ApiService.instance = this;
  }
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
  baseUrl: string = AppSettings.API_URL;
  loginKey: string = AppSettings.LoginKey;
  roleKey: string = AppSettings.RoleKey;
  getToken() {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthToken) => {
          return token.isValid() ? token.getValue() : '';
        }),
      );
  }

  GET(url: string){
    return this.getToken().pipe(
      switchMap(token => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
          })
        };
        return this.http.get(this.baseUrl + url, httpOptions);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Not Found:', error);
    if (error.status === 401 || (error.headers && error.headers.get('invalidtoken'))) {
      window.location.href = '/login';
    }
    return throwError(() => error);
  }
  DELETE(url: string): Observable<any> {
    let token;
    this.getToken().subscribe(data => token = data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      }),
    };
    return this.http.delete(this.baseUrl + url, httpOptions);
  }

  async postRequest(url: string, obj: any | null) {
    let token;
    this.getToken().subscribe(data => token = data);
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` }
    });
    try {
      var axiosResponse = await instance.request({
        method: 'post',
        url: url,
        data: JSON.stringify(obj)
      });
      return axiosResponse.data
    } catch (error: any) {
      catchError(this.handleError);
    }
  }
  async putRequest(url: string, obj: any | null): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let token;
        await this.getToken().subscribe(data => {
          token = data
        });
        const instance = axios.create({
          baseURL: this.baseUrl,
          headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` }
        });

        const axiosResponse = await instance.request({
          method: 'put',
          url: url,
          data: JSON.stringify(obj)
        });

        resolve(axiosResponse.data);
      } catch (error: any) {
        reject(error.response);
      }
    });
  }

}
