import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private url = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  createGroup(data) {
    let url = this.url + '/creategroup';
    return this.http.post(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getUserGroups(data) {
    let url = this.url + '/getgroups';
    return this.http.post(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

}
