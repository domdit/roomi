import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {log} from "util";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) {
  }

  registerUser(data) {
    let url = this.url + '/register';
    return this.http.post(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  loginUser(data) {
    let url = this.url + '/login';
    return this.http.post(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    return !this.jwtHelper.isTokenExpired(token)
  }

}


